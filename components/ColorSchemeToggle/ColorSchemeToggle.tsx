import { Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Switch
      checked={colorScheme === 'dark'}
      onChange={() => toggleColorScheme()}
      size="md"
      onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
      offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
      styles={{ body: { paddingBottom: '15px' } }}
    />
  );
}
