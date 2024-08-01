import { PlaceListItem, PlaceListItemProps } from "./PlaceListItem";

interface PlaceListProps {
    data: PlaceListItemProps[]
}

export function PlaceList({ data }: PlaceListProps) {
    return (
        <div>
            {data.map(({ name, urls, summary, textMatchPreview, objectives, rawText }) => (
                <PlaceListItem
                    key={name + rawText.slice(0, 5)}
                    name={name}
                    objectives={objectives}
                    urls={urls}
                    summary={summary}
                    textMatchPreview={textMatchPreview}
                    rawText={rawText}
                />)
            )}
        </div>
    )
}
