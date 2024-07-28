import NavList from "./NavList";

const data = [
    {
        url: '/',
        text: 'Home'
    }
];

export default function NavListContainer() {
    return (
        <>
            <NavList data={data} />
        </>
    )
}