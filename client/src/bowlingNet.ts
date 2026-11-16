import type { Network } from './network';

export type { BowlingPartyState, BowlingReward } from './network';
export type { BowlingSnapshot } from '../../shared/bowlingConfig';

export class BowlingNet {
  constructor(private readonly network: Network) {}

  startSolo(): void { this.network.startBowlingSolo(); }
  createParty(): void { this.network.createBowlingParty(); }
  invite(playerId: string): void { this.network.inviteBowlingPartyPlayer(playerId); }
  respond(partyId: string, accept: boolean): void { this.network.respondBowlingPartyInvite(partyId, accept); }
  leaveParty(): void { this.network.leaveBowlingParty(); }
  startParty(): void { this.network.startBowlingParty(); }
  throwBall(aim: number, power: number): void { this.network.throwBowling(aim, power); }
  leave(): void { this.network.leaveBowling(); }
  playAgain(): void { this.network.playAgainBowling(); }
}
