interface GreenButtonProps {
    text: string;
    onClick: () => any;
}

export default function GreenButton({ text, onClick }: GreenButtonProps) {
    return (
        <button
            className="bg-green-700 rounded-md hover:bg-green-500 text-green-200 mx-1 my-3 px-4 py-1 text-sm"
            type="submit"
            onClick={onClick}
        >
            {text}
        </button>
    );
}
