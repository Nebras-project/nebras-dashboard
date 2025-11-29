/**
 * Competitions Feature
 *
 * Main entry point for competitions feature
 * Re-exports all competition and exam modules
 */

// Pages - exported explicitly for routing
export {
  CompetitionsPage,
  CompetitionPage,
  CompetitionParticipantsPage,
} from './competition/pages';

export { CompetitionResultPage } from './exam/pages';

// Competition module (components, hooks, services, utils, data)
export * from './competition';

// Exam module (components, hooks, services, utils, data)
export * from './exam';
