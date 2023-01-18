import { useEffect, useState } from 'react';
import { Menu, Button, CopyButton, ActionIcon, Tooltip } from '@mantine/core';
import {
  IconSearch,
  IconTrash,
  IconChevronDown,
  IconChevronUp,
  IconLogin,
  IconCopy,
  IconCheck,
} from '@tabler/icons';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const etherScanAddress = 'https://etherscan.io/address/';

function truncateMiddleString(str: string, maxLength: number) {
  const strLen = str.length;
  if (strLen > maxLength) {
    const start = Math.floor((maxLength - 3) / 2);
    const end = strLen - start;
    return `${str.slice(0, start)}...${str.slice(end)}`;
  }
  return str;
}

function returnChevron(bool: boolean) {
  if (bool) return <IconChevronUp />;
  return <IconChevronDown />;
}

export function Web3Wallet() {
  const { isConnected, address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const [isConnectedWeb3, setIsConnected] = useState(false);
  const [opened, setOpened] = useState(false);
  useEffect(() => setIsConnected(isConnected), [isConnected]);

  if (isConnectedWeb3) {
    return (
      <Menu opened={opened} onChange={setOpened} shadow="md" width={300}>
        <Menu.Target>
          <Button rightIcon={returnChevron(opened)} onClick={() => setOpened(false)}>
            {ensName || address} {opened}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Account</Menu.Label>
          <Menu.Item>{truncateMiddleString(address, 14)}</Menu.Item>
          <a href={`${etherScanAddress}${address}`} style={{ textDecoration: 'none' }}>
            <Menu.Item icon={<IconSearch size={14} />}>Explorer</Menu.Item>
          </a>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item onClick={() => disconnect()} color="red" icon={<IconTrash size={14} />}>
            Disconnect
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <Button
      leftIcon={<IconLogin />}
      onClick={() => {
        connect();
        setOpened(true);
      }}
    >
      Connect Wallet
    </Button>
  );
}
