import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import Grid from './Grid'
import type { IGridProps } from './Grid'
import artist from '../Card/mock'

const mainPaintingsData: IGridProps = {
    children: Array(6).fill(artist),
}

describe('GalleryList Component', () => {
    describe('render gallery', () => {
        const { container } = render(
            <Grid children={mainPaintingsData.children} />
        )
        const gallery = container.firstChild

        test('check Grid', () => {
            expect(gallery).toBeInTheDocument()
        })
    })
})
