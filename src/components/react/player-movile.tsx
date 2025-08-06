import { useCallback, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, type PanInfo } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'
import { extractDominantColor, type ColorResult } from '@/utils/color-extractor'
import { useAudioContext } from '@/hooks/use-audio-context'
import { useAudioSeek } from '@/hooks/use-audio-seek'
import { usePlaySong } from '@/hooks/use-store'
import PlayerMovilePanel from '@/components/react/player-movile-panel'
import PlayerCurrentSongMovile from '@/components/react/player-current-song-movile'
import { IGNORED_COLORS_SONG_PANEL_MOBILE } from '@/config/ignored-colors'

export const PlayerMovile = () => {
  const { isPlaying, currentSong } = usePlaySong(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      currentSong: state.shuffle ? state.shufflePlaylist : state.currentSong,
    })),
  )
  const { audioRef } = useAudioContext()
  const audioSeekState = useAudioSeek({ audioRef })

  const y = useMotionValue(0)
  const height = useTransform(y, [-280, 0], ['calc(100vh - 3.5rem)', '3.5rem'])
  const borderRadius = useTransform(y, [-80, 0], ['0px', '6px'])
  const positionX = useTransform(y, [-80, 0], ['0rem', '0.5rem'])
  const [isExpanded, setIsExpanded] = useState(false)
  const [color, setColor] = useState<ColorResult | null>()

  const handleExpand = useCallback(() => {
    animate(y, isExpanded ? 0 : -280, { type: 'spring', stiffness: 300, damping: 30 })
    setIsExpanded((prev) => !prev)
  }, [isExpanded])

  const handleDragEnd = useCallback(
    (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const offset = info.offset.y

      const target = e.target as HTMLElement

      if (target.closest('[data-expanded-song]')) {
        return
      }

      if (offset < -120) {
        animate(y, -280, { type: 'spring', stiffness: 300, damping: 30 })
        setIsExpanded(true)
      } else {
        animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 })
        setIsExpanded(false)
      }
    },
    [y],
  )

  useEffect(() => {
    return () => {
      y.stop()
    }
  }, [y])

  useEffect(() => {
    const getColor = async () => {
      if (currentSong?.song?.imageUrl) {
        const color = await extractDominantColor(currentSong.song.imageUrl, {
          ignoredColor: IGNORED_COLORS_SONG_PANEL_MOBILE,
        })
        setColor(color)
      }
    }

    getColor()
  }, [currentSong?.song?.imageUrl])

  return (
    <motion.div
      drag={isExpanded ? false : 'y'}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      dragConstraints={{ top: -280, bottom: 0 }}
      style={{
        y,
        height,
        borderRadius,
        backgroundColor: color ? color.hex : 'bg-night',
        left: positionX,
        right: positionX,
      }}
      onDragEnd={handleDragEnd}
      className={`fixed z-40 touch-none overflow-hidden rounded-md shadow-lg lg:hidden ${
        isExpanded ? 'inset-x-0' : 'bottom-14'
      } ${!currentSong?.song ? 'hidden' : 'block'}`}
    >
      <div className="h-full w-full">
        {isExpanded ? (
          <PlayerCurrentSongMovile
            onExpand={handleExpand}
            currentSong={currentSong?.song}
            audioSeekState={audioSeekState}
            audioRef={audioRef}
          />
        ) : (
          <PlayerMovilePanel
            onExpand={handleExpand}
            className={`${color?.isDark ? 'last:text-sealsalt [&_h4]:text-sealsalt [&_p]:text-neutral-400' : 'last:text-black [&_h4]:text-black [&_p]:text-neutral-800'} `}
            audioSeekState={audioSeekState}
            audioRef={audioRef}
            currentSong={currentSong?.song}
            isPlaying={isPlaying}
          />
        )}
      </div>
    </motion.div>
  )
}

export default PlayerMovile
