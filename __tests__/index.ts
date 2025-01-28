import { fortyData } from './../types/score';
import { describe, expect, test } from '@jest/globals';
import { otherPlayer, playerToString, pointToString, scoreToString, scoreWhenPoint } from '..';
import { deuce, advantage, game, forty, points, love, fifteen, thirty, Point, PointsData, Score } from '../types/score';
import * as fc from 'fast-check';
import * as G from './generators';
import { Player } from '../types/player';

/* describe('Tests for pointToString', () => {
  test('Should return "Love" for LOVE point', () => {
    expect(pointToString(love())).toBe('Love');
  });

  test('Should return "Fifteen" for FIFTEEN point', () => {
    expect(pointToString(fifteen())).toBe('Fifteen');
  });

  test('Should return "Thirty" for THIRTY point', () => {
    expect(pointToString(thirty())).toBe('Thirty');
  });
});

describe('Tests for scoreToString', () => {
  test('Should return correct string for Points score', () => {
    const result = points(love(), fifteen());
    expect(scoreToString(result)).toBe('Player One: Love, Player Two: Fifteen');
  });

  test('Should return "Deuce" for Deuce score', () => {
    expect(scoreToString(deuce())).toBe('Deuce');
  });

  test('Should return correct string for Advantage score', () => {
    const result = advantage('PLAYER_ONE');
    expect(scoreToString(result)).toBe('Advantage Player 1');
  });

  test('Should return correct string for Game score', () => {
    const result = game('PLAYER_TWO');
    expect(scoreToString(result)).toBe('Game won by Player 2');
  });

  test('Should return correct string for Forty score', () => {
    const result = forty('PLAYER_ONE', thirty());
    expect(scoreToString(result)).toBe('Player Player 1 is at Forty, Opponent has Thirty');
  });

  // Helper function to increment a player's points
const incrementPoint = (point: Point): Point | 'FORTY' => {
  switch (point.kind) {
    case 'LOVE':
      return { kind: 'FIFTEEN' };
    case 'FIFTEEN':
      return { kind: 'THIRTY' };
    case 'THIRTY':
      return 'FORTY'; // Transition to 40
    default:
      throw new Error('Invalid point');
  }
};


  
  
}); */


describe('Tests for transition functions', () => {
  test('Given deuce, score is advantage to winner', () => {
    console.log('To fill when we will know how represent Deuce');
  });
  test('Given advantage when advantagedPlayer wins, score is Game avantagedPlayer', () => {
    console.log('To fill when we will know how represent Advantage');
  });
  test('Given advantage when otherPlayer wins, score is Deuce', () => {
    console.log('To fill when we will know how represent Advantage');
  });
  test('Given a player at 40 when the same player wins, score is Game for this player', () => {
    console.log('To fill when we will know how represent Forty');
  });
  test('Given player at 40 and other at 30 when other wins, score is Deuce', () => {
    console.log('To fill when we will know how represent Forty');
  });
  test('Given player at 40 and other at 15 when other wins, score is 40 - 15', () => {
    console.log('To fill when we will know how represent Forty');
  });
 // -------------------------TESTS POINTS-------------------------- //
 test('Given players at 0 or 15 points score kind is still POINTS', () => {
  fc.assert(
    fc.property(G.getPointsLoveOrFifteen(), G.getPlayer(), ({ pointsData }, winner) => {
      // Preconditions
      expect(['LOVE', 'FIFTEEN']).toContain(pointsData.PLAYER_ONE.kind);
      expect(['LOVE', 'FIFTEEN']).toContain(pointsData.PLAYER_TWO.kind);

      // Simulate score update
      const result = scoreWhenPoint(pointsData, winner);

      // Assertions
      expect(result.kind).toBe('POINTS'); // Score should still be POINTS
    })
  );
});

test('Given one player at 30 and win, score kind is forty', () => {
  fc.assert(
    fc.property(G.getPointsWithThirty(), G.getPlayer(), ({ pointsData }, winner) => {
      // Preconditions: One of the players must have 30 points.
      expect(pointsData.PLAYER_ONE.kind === 'THIRTY' || pointsData.PLAYER_TWO.kind === 'THIRTY').toBe(true);

      // Simulate score update based on the winner
      const result = scoreWhenPoint(pointsData, winner);

      // Assertions: The result should transition to 'FORTY' for the winner
      if (result.kind === 'FORTY') {
        // The player who won the point should have 'FORTY'
        expect(result.fortyData.player).toBe(winner); 
      } else {
        // If the result didn't transition to 'FORTY', throw an error
        throw new Error('Expected result to transition to FORTY');
      }
    })
  );
});



});
