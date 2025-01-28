import { getPointsLoveOrFifteen } from './generators';
import { describe, expect, test } from '@jest/globals';
import { deuce, advantage, game, forty, points, love, fifteen, thirty, PointType, Score } from '../types/score';
import * as fc from 'fast-check';
import * as G from './generators';
import { Player } from '../types/player';
import { PointEnum } from './../types/pointEnum';
import { scoreWhenPoint } from './../types/score'; // Update with the correct path to where scoreWhenPoint is defined

export type PointsData = {
  PLAYER_ONE: PointType;
  PLAYER_TWO: PointType;
};

describe('Tests for transition functions', () => {
  // Test for transition from Deuce to Advantage
  test('Given deuce, score is advantage to winner', () => {
    console.log('To fill when we will know how to represent Deuce');
  });

  // Test for transition from Advantage to Game when the advantaged player wins
  test('Given advantage when advantagedPlayer wins, score is Game for advantagedPlayer', () => {
    console.log('To fill when we will know how to represent Advantage');
  });

  // Test for transition from Advantage back to Deuce when the other player wins
  test('Given advantage when otherPlayer wins, score is Deuce', () => {
    console.log('To fill when we will know how to represent Advantage');
  });

  // Test for transition from Forty to Game when the player at Forty wins
  test('Given a player at 40 when the same player wins, score is Game for this player', () => {
    console.log('To fill when we will know how to represent Forty');
  });

  // Test for transition from Forty and Thirty to Deuce when the other player wins
  test('Given player at 40 and other at 30 when other wins, score is Deuce', () => {
    console.log('To fill when we will know how to represent Forty');
  });

  // Test for transition from Forty and Fifteen to a score of 40-15 when the other wins
  test('Given player at 40 and other at 15 when other wins, score is 40 - 15', () => {
    console.log('To fill when we will know how to represent Forty');
  });

  // -------------------------TESTS POINTS-------------------------- //
  test('Given players at 0 or 15 points score kind is still POINTS', () => {
    fc.assert(
      fc.property(G.getPointsLoveOrFifteen(), G.getPlayer(), (pointsData, winner) => {
        // Preconditions: One of the players must have LOVE or FIFTEEN points.
        expect([PointEnum.LOVE, PointEnum.FIFTEEN]).toContain(pointsData.PLAYER_ONE.kind);
        expect([PointEnum.LOVE, PointEnum.FIFTEEN]).toContain(pointsData.PLAYER_TWO.kind);
  
        // Simulate score update based on the winner
        const result = scoreWhenPoint(pointsData, winner);
  
        // Assertions: The result should still be 'POINTS'
        expect(result.kind).toBe('POINTS'); // Score should still be POINTS
      })
    );
  });
  

  // Test when one player is at 30 points and wins, the score should transition to Forty
  test('Given one player at 30 and win, score kind is forty', () => {
    fc.assert(
      fc.property(G.getPointsWithThirty(), G.getPlayer(), ({ pointsData }, winner) => {
        // Preconditions: One of the players must have 30 points.
        expect(pointsData.PLAYER_ONE.kind).toBe(PointEnum.THIRTY); // PLAYER_ONE should be at THIRTY
        expect([PointEnum.LOVE, PointEnum.FIFTEEN, PointEnum.THIRTY]).toContain(pointsData.PLAYER_TWO.kind); // PLAYER_TWO can be at LOVE, FIFTEEN, or THIRTY
  
        // Simulate score update based on the winner
        const result = scoreWhenPoint(pointsData, winner);
  
        // Check the result based on the kind
        if (result.kind === 'FORTY') {
          // If the result is FORTY, check that the player who won is at 40
          expect(result.fortyData.player).toBe(winner);
        } else if (result.kind === 'POINTS') {
          // If the result is POINTS, check that the points data is correctly updated
          expect([PointEnum.LOVE, PointEnum.FIFTEEN, PointEnum.THIRTY]).toContain(result.pointsData.PLAYER_TWO.kind);
          if (winner === 'PLAYER_ONE') {
            expect(result.pointsData.PLAYER_ONE.kind).toBe(PointEnum.FORTY);
          }
        } else {
          // If result is neither FORTY nor POINTS, throw an error
          throw new Error('Expected result to be either POINTS or FORTY');
        }
      })
    );
  });
  
    
});
