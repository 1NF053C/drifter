export interface PlaceListItemProps {
    url: string,
    summary: string
    //objective: string
    //textMatchPreview: string
}

export function PlaceListItem({ url, summary }: PlaceListItemProps) {
    return (
        <>
            <div>{url}</div>
            <div>{summary}</div>
        </>
    )
}

// # List Component
//   # ListItem Component (name, filepath) (static)
//     # url (computed, extract)
//     # objective (computed, extract)
//     # textMatchPreview (computed, extract)
//     # summary (computed, paraphrase with spin)
