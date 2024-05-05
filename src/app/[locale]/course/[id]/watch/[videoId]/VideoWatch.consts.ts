import { TCommentsSettings } from "./VideoWatch.types";

export const commentsSettingsInitialValues: TCommentsSettings = {
  orderBy: 'createdAt',
  order: 'ASC'
};

export const orderByOptions = (t: (key: string) => string) => [{
  id: 'createdAt',
  name: t('CourseWatch.createdAt'),
}];

export const orderOptions = (t: (key: string) => string) => [{
  id: 'ASC',
  name: t('CourseWatch.asc'),
}, {
  id: 'DESC',
  name: t('CourseWatch.desc'),
}];
