import { useContext, useState } from 'react';
import { FiltersContext } from '../store/context/filters-context';
import { Switch, Text } from 'react-native';

export default function FilterSwitch({ filterItem }) {
  const filtersContext = useContext(FiltersContext);
  const isToggled = filtersContext.ids.includes(filterItem.id);

  const [isEnabled, setIsEnabled] = useState(isToggled);

  function toggleSwitch() {
    if (isEnabled) {
      filtersContext.removeFilter(filterItem.id);
    } else {
      filtersContext.addFilter(filterItem.id);
    }
    setIsEnabled((previousState) => !previousState);
  }
  return (
    <Switch
      trackColor={{ false: '#767577', true: '#22c55e' }}
      thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
}
