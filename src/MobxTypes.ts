/*
 * this file contains types/interfaces for core parts of Mobx that we make use of
 * but aren't included in Mobx's declaration files.
 */

export type MobxEventType = 'add' | 'reaction' | 'create' | 'update';

export interface MobxEvent {
  type?: MobxEventType;
  name: string;
  object?: any;
  newValue?: any;
  spyReportStart?: boolean;
  spyReportEnd?: boolean;
}
