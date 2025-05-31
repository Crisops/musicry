import { Link as LinkHero, type LinkProps } from '@heroui/link'

const Link = ({ children, ...props }: LinkProps) => {
  return <LinkHero {...props}>{children}</LinkHero>
}

export default Link
