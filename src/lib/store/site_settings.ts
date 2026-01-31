import { persistentJSON } from '@nanostores/persistent'
import type { SettingsSite } from '../type'

const DEFAULT_SETTINGS: SettingsSite = {
  viewCelsius: false,
  viewKm: true
}

export const $settings = persistentJSON<SettingsSite>(
  'settings',
  DEFAULT_SETTINGS
)

export function getSiteSettings (){
  const data = $settings.get();
  return data
}

export function toggleCelsius() {
  const current = $settings.get();
  $settings.set({
    ...current,
    viewCelsius: !current.viewCelsius
  });
}

export function toggleKm() {
  const current = $settings.get();
  $settings.set({
    ...current,
    viewKm: !current.viewKm
  });
}