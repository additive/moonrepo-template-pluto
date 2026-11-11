import { httpResource } from '@angular/common/http'
import { Component, signal } from '@angular/core'
import { TranslocoPipe } from '@jsverse/transloco'

import { HlmBadge } from '@pluto/helm/badge'
import { HlmButton } from '@pluto/helm/button'
import {
	HlmCard,
	HlmCardContent,
	HlmCardDescription,
	HlmCardHeader,
	HlmCardTitle,
} from '@pluto/helm/card'
import { HlmSkeleton } from '@pluto/helm/skeleton'

import type { Post } from './models/post'

const API = 'https://jsonplaceholder.typicode.com/posts'

/**
 * Example page showing `httpResource`: a list loaded on open and a post fetched on demand.
 */
@Component({
	selector: 'app-feature-example',
	templateUrl: './example.component.html',
	imports: [
		TranslocoPipe,
		HlmBadge,
		HlmButton,
		HlmCard,
		HlmCardHeader,
		HlmCardTitle,
		HlmCardDescription,
		HlmCardContent,
		HlmSkeleton,
	],
})
export class ExampleFeature {
	private readonly randomPostId = signal<number | undefined>(undefined)

	protected readonly skeletons = Array.from({ length: 5 })

	protected readonly posts = httpResource<Post[]>(() => ({
		url: API,
		params: { _limit: '5' },
	}))

	protected readonly randomPost = httpResource<Post>(() => {
		const id = this.randomPostId()
		return id ? `${API}/${id}` : undefined
	})

	protected fetchRandomPost(): void {
		this.randomPostId.set(Math.floor(Math.random() * 100) + 1)
	}
}
