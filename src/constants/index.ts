import { DropdownOption } from '@components/dropdown';

export const CATEGORY_URL = 'https://opentdb.com/api_category.php';
export const QUIZ_URL = 'https://opentdb.com/api.php';

export const DIFFICULTY_OPTIONS: DropdownOption[] = [
  {
    label: 'Easy',
    value: 'Easy',
    id: 1,
  },
  {
    label: 'Medium',
    value: 'Medium',
    id: 2,
  },
  {
    label: 'Hard',
    value: 'Hard',
    id: 3,
  },
];
