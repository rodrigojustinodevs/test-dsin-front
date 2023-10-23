interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
    condition?: boolean;
}

export function If({ children, condition }: Props) {
    return condition ? children : null;
}
