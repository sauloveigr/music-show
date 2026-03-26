import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirst(value?: string | null): string {
    if (!value) {
        return '';
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return '';
    }

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function parseLocalDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

export function parseShowDateTime(dateString: string, timeString?: string): Date {
    if (timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day, hours, minutes ?? 0);
    }

    return parseLocalDate(dateString);
}
