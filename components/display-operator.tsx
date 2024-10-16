interface DisplayOperatorProps {
    op: string;
    negate?: boolean;
}

export default function DisplayOperator({ op, negate }: DisplayOperatorProps) {
    switch (op) {
        case 'isIn':
            return negate ? 'is not in' : 'is in';
        case '==':
            return negate ? 'is not equal to' : 'is equal to';
        case '!=':
            return negate ? 'is not equal to' : 'is equal to';
        case '>=':
            return negate ? 'less than' : 'greater than or equal to';
        case '>':
            return negate ? 'less than or equal to' : 'greater than';
        case '<':
            return negate ? 'greater than' : 'less than or equal to';
        case '>=':
            return negate ? 'less than' : 'greater than or equal to';
    }
}