{
  title: string,
  controller: string, // Front-end controller to use for display
  state: string, // currently "open", "in progress", "complete"
  participants: [
    {
      name: string,
      id: number
    }
  ],
  config: {
    type: string, // currently "groups" or "bracket"
    track_score: boolean, // collect win/loss or match scores

    // if "groups"
    use_points: boolean, // show points or percentage
    win_points: number, // points for a win
    loss_points: number, // points for a loss
    use_ties: boolean, // show ties
    tie_points: number, // points for a tie
    use_bonus: boolean, // show bonus points
  },
  groups: [
    {
      title: string,
      standings: [
        {
          name: string,
          id: number,
          wins: number,
          losses: number,
          ties: number,
          bonus: number,
          points: number, // Match points
          percentage: number, // Winning percentage
          score_for: number,
          score_against: number,
          score_differential: number,
          position_status: string, // Used to denote current state ("in top 3")
          position_flag: string // Used to denote permanent state ("clinched playoffs")
        }
      ]
    }
  ],
  rounds: [
    {
      title: string,
      round: number,
      games: [
        {
          bye: true,
        },
        {
          id: number,
          round: number,
          away: number,
          home: number,
          away_from: number,
          home_from: number
          winner_to: number,
          loser_to: number,
          result: string, // currently "upcoming", "home", "away", "tie"
          away_score: number,
          home_score: number,
          title: string // "Group A", "Loser's Bracket"
        }
      ]
    }
  ]
}