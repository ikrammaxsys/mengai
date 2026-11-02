import assert from 'node:assert/strict';
import { reelParametersForDifficulty } from '../shared/fishConfig.js';
import { ReelGame } from '../client/src/reelGame.js';

const easy = reelParametersForDifficulty(0, 'common', '#77b789');
const hard = reelParametersForDifficulty(1, 'legendary', '#d5a633');
assert.equal(easy.greenWidth, 38);
assert.equal(hard.greenWidth, 18);
assert.ok(hard.driftSpeed > easy.driftSpeed);
assert.ok(hard.fillRate < easy.fillRate);

const control = new ReelGame(easy);
assert.equal(control.current.meter, 0.3);
control.setHeld(true);
for (let i = 0; i < 10; i++) control.update(0.05);
const heldMarker = control.current.marker;
assert.ok(heldMarker > 50, 'holding Space should lift the marker');
control.setHeld(false);
for (let i = 0; i < 25; i++) control.update(0.05);
assert.ok(control.current.marker >= 0 && control.current.marker <= 100, 'marker remains inside bar bounds');
assert.ok(control.current.meter > 0, 'short mistakes must not fail instantly');

const guaranteedCatch = new ReelGame({ ...easy, greenWidth: 200 });
for (let i = 0; i < 100 && guaranteedCatch.result === 'active'; i++) guaranteedCatch.update(0.05);
assert.equal(guaranteedCatch.result, 'success', 'full meter completes the reel game');

console.log('Reel mini-game checks passed: difficulty scaling, hold/release movement, forgiving meter, and completion.');
