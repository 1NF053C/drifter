import { PlaceListItem, PlaceListItemProps } from "./PlaceListItem";

interface PlaceListProps {
    data: PlaceListItemProps[]
}

export function PlaceList({ data }: PlaceListProps) {
    return (
        <div>
            {data.map(itemData => <PlaceListItem url={itemData.url} summary={itemData.summary} />)}
        </div>
    )
}
