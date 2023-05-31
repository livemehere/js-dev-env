export default function getUuid() {
    return  Math.random().toString(16).slice(2);
}