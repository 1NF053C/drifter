import { PlaceView } from '@/app/components/PlaceListContainer/views/PlaceView';
import './index.css';

export interface PlaceListItemProps extends PlaceView { }

export function PlaceListItem({ name, summary, objectives, textMatchPreview, urls, rawText }: PlaceListItemProps) {
    return (
        <div className='place-list-item'>
            Name:
            <div>{name}</div>
            Objectives:
            <ul>
                {objectives.map(objective => <li key={objective}>{objective}</li>)}
            </ul>
            Summary:
            <div>{summary}</div>
            Urls:
            <ul>
                {urls.map(url => <li key={url}>{url}</li>)}
            </ul>
            <div>{textMatchPreview}</div>
            <div>{rawText}</div>
        </div>
    )
}

// # List Component
//   # ListItem Component (name, filepath) (static)
//     # url (computed, extract)
//     # objective (computed, extract)
//     # textMatchPreview (computed, extract)
//     # summary (computed, paraphrase with spin)
