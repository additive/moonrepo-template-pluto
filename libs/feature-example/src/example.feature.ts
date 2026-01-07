import { httpResource } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

import type { Post } from './models/post'

/**
 * Example feature demonstrating httpResource usage.
 */
@Component({
	selector: 'app-feature-example',
	templateUrl: './example.feature.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleFeature {
	/** Auto-loaded posts using httpResource */
	readonly posts = httpResource<Post[]>(() => ({
		url: 'https://jsonplaceholder.typicode.com/posts',
		params: { _limit: '5' },
	}))

	/** Signal to trigger fetching a random post */
	readonly randomPostId = signal<number | undefined>(undefined)

	/** Reactive resource that fetches when randomPostId changes */
	readonly randomPost = httpResource<Post>(() => {
		const id = this.randomPostId()
		return id ? `https://jsonplaceholder.typicode.com/posts/${id}` : undefined
	})

	fetchRandomPost(): void {
		const randomId = Math.floor(Math.random() * 100) + 1
		this.randomPostId.set(randomId)
	}
}
