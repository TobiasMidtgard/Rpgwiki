/**
 * Seed version, kept apart from the seed itself.
 *
 * `seed.ts` eagerly imports every content module, so it is by far the largest
 * thing in the project. It is also only needed once — on a first visit, or on
 * an explicit reset — because after that the world is read back out of
 * IndexedDB. Keeping the version number here lets the app decide whether it
 * needs the seed before paying to download it.
 *
 * Bump this when seed content changes, so installs that have never been edited
 * pick the change up.
 */
export const SEED_VERSION = 8
