import { TestBed } from '@angular/core/testing'

import { MOON_PROJECT, provideMoonProject } from '.'
import { getMoonConfig } from './moon'
import type { MoonProject } from './schemas'

describe('MOON_PROJECT', () => {
	let moonProject: MoonProject
	let moonProjectRaw: MoonProject

	beforeEach(() => {
		moonProjectRaw = getMoonConfig('src/__fixtures__/').project

		// Fake esbuild plugin define
		window.MOON_PROJECT_JSON = moonProjectRaw

		TestBed.configureTestingModule({
			providers: [provideMoonProject()],
		})

		moonProject = TestBed.inject(MOON_PROJECT)
	})

	it('should have equal metadata', () => {
		expect(moonProject.metadata).toMatchObject(moonProjectRaw.metadata)
	})
})
