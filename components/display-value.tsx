interface DisplayValueProps {
    value: any
}

export default function DisplayValue({ value }: DisplayValueProps) {
    if (Array.isArray(value)) {
        return <>[{value.map((item, index) => {
            return <><DisplayValue value={item} />{!!index && ", "}</>
        })}]</>
    } else if (typeof (value) === "string") {
        return <>
            "{value}"
        </>
    } else {
        return <>
            {value.toString()}
        </>
    }
}