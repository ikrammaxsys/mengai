export const PLAYER_EMOJIS = ['😀', '😂', '😍', '😮', '😭', '👏', '❤️', '🔥', '🎉'] as const;

export type PlayerEmoji = typeof PLAYER_EMOJIS[number];

export function isPlayerEmoji(value: unknown): value is PlayerEmoji {
  return typeof value === 'string' && PLAYER_EMOJIS.some((emoji) => emoji === value);
}
