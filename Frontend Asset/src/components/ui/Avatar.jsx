import { cn } from '@/utils'
import { LuUser, LuImageOff } from 'react-icons/lu'

/**
 * Reusable Avatar component with modern enterprise design
 * Supports image, initials, and fallback states
 */
export function Avatar({
  src = null,
  alt = '',
  name = null,
  size = 'md',
  variant = 'circle',
  className = '',
  imgClassName = ''
}) {
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl'
  }

  const variants = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    rounded: 'rounded-xl'
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  const getGradient = (name) => {
    if (!name) return 'from-[rgb(var(--color-primary-500))] to-[rgb(var(--color-primary-600))]'
    
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600'
    ]
    
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        'bg-gradient-to-br',
        'font-medium text-[rgb(var(--color-primary-foreground))]',
        'shadow-sm overflow-hidden',
        sizes[size],
        variants[variant],
        className
      )}
      style={{ background: src ? undefined : getGradient(name) }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            'h-full w-full object-cover',
            imgClassName
          )}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement.classList.add(getGradient(name))
          }}
        />
      ) : name ? (
        <span>{getInitials(name)}</span>
      ) : (
        <LuUser className="h-1/2 w-1/2" aria-hidden="true" />
      )}
    </div>
  )
}

/**
 * Avatar group with overlapping avatars
 */
export function AvatarGroup({
  avatars = [],
  max = 4,
  size = 'md',
  className = ''
}) {
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = Math.max(0, avatars.length - max)

  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative ring-2 ring-[rgb(var(--color-surface))]"
          style={{ zIndex: max - index }}
        >
          <Avatar
            src={avatar.src}
            name={avatar.name}
            alt={avatar.alt}
            size={size}
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'relative flex items-center justify-center',
            'rounded-full bg-[rgb(var(--color-surface-hover))]',
            'text-xs font-medium text-[rgb(var(--color-text-secondary))]',
            'ring-2 ring-[rgb(var(--color-surface))]'
          )}
          style={{
            width: size === 'xs' ? '24px' : size === 'sm' ? '32px' : size === 'md' ? '40px' : size === 'lg' ? '48px' : size === 'xl' ? '64px' : '80px',
            height: size === 'xs' ? '24px' : size === 'sm' ? '32px' : size === 'md' ? '40px' : size === 'lg' ? '48px' : size === 'xl' ? '64px' : '80px'
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}

/**
 * Avatar with online status indicator
 */
export function AvatarWithStatus({
  src = null,
  name = null,
  status = 'offline',
  size = 'md',
  className = ''
}) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  }

  const statusSizes = {
    xs: 'h-2 w-2',
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-3.5 w-3.5',
    xl: 'h-4 w-4',
    '2xl': 'h-5 w-5'
  }

  return (
    <div className={cn('relative inline-block', className)}>
      <Avatar src={src} name={name} size={size} />
      <span
        className={cn(
          'absolute bottom-0 right-0 rounded-full ring-2 ring-[rgb(var(--color-surface))]',
          statusColors[status],
          statusSizes[size]
        )}
        aria-label={`Status: ${status}`}
      />
    </div>
  )
}

export default Avatar
