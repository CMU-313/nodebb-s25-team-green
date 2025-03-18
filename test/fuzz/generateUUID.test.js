/* eslint-disable prefer-arrow-callback */
/* eslint-disable indent */

'use strict';

const { expect } = require('chai');
const utils = require('../../src/utils'); // Using require to prevent ESM issues

describe('Fuzz Test: utils.generateUUID()', function () {
    it('should generate valid UUIDs consistently', function () {
        for (let i = 0; i < 100; i++) { // Run 100 tests
            const uuid = utils.generateUUID();

            // Ensure the result is a string
            expect(uuid).to.be.a('string');

            // Ensure the UUID matches the standard format
            expect(uuid).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        }
    });
});
