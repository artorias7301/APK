// import satisfaction from ''

import { satisfaction } from "./api"

export const COLORS = {
  black: '#000000',
  panel: '#071007',
  green: '#00ff88',
  white: '#F5FFF3',
  gray: '#777777',
  grayLight: '#A0A0A0',
  orange: '#FFB020',
  gold: '#f5b942',
  silver: '#000',
  coper: '#000',
  PeopleSatisfy: satisfaction > 70 ? '#00ff88':
    satisfaction < 30 ? '#ff1a1a': '#fab83f'
}