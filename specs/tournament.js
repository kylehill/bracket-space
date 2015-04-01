{
  title: string,
  service: string, // Back-end service to use for administration logic
  short_url: string,
  participants: [
    {
      name: string,
      id: number
    }
  ],
  phases: [ Phase ],
  config: {
    track_score: boolean
  }
}