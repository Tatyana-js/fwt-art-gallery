import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import Card from './Card'
import type IArtist from '@/types/Artist'
import artist from './mock'

const cardData: IArtist = artist

describe('Card Component', () => {
    describe('render card', () => {
        const { container } = render(
            <Card mainPainting={cardData.mainPainting} />
        )
        const card = container.firstChild

        test('check Card', () => {
            expect(card).toBeInTheDocument()
        })
    })
})
