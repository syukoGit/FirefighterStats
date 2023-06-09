type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export function isMonth(data: any): data is Month {
    return (
        data === 'January' ||
        data === 'February' ||
        data === 'March' ||
        data === 'April' ||
        data === 'May' ||
        data === 'June' ||
        data === 'July' ||
        data === 'August' ||
        data === 'September' ||
        data === 'October' ||
        data === 'November' ||
        data === 'December'
    );
}

export default Month;
