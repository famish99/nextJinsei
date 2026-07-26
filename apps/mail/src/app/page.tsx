"use client";

import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import { 
  Container, 
  Card, 
  Badge, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack, 
  Loader, 
  Center,
  Box,
  Menu,
  Avatar
} from "@mantine/core";
import { IconLogout, IconMail, IconAlertTriangle, IconSettings } from "@tabler/icons-react";
import "@aws-amplify/ui-react/styles.css";
import "@mantine/core/styles.css";

import type { Schema } from "../../../../amplify/data/resource";
import outputs from "../../../../amplify_outputs.json";

// Configure Amplify
Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function EmailsPage() {
  const [emails, setEmails] = useState<Schema["Email"]["type"][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const response = await client.queries.listEmails();
        if (response.data) {
          // Type cast because response.data can contain nulls in the array
          setEmails(response.data as Schema["Email"]["type"][]);
        }
      } catch (err) {
        console.error("Error fetching emails:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEmails();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Box bg="#f8f9fa" mih="100vh" pb="xl">
          <Box bg="white" style={{ borderBottom: '1px solid #dee2e6' }} py="md" px="xl" mb="xl">
            <Group justify="space-between">
              <Group>
                <IconMail size={24} color="#228be6" />
                <Title order={3}>Inbox</Title>
              </Group>

              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <Avatar 
                    color="blue" 
                    radius="xl" 
                    size="sm" 
                    style={{ cursor: 'pointer' }} 
                  />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Signed in as</Menu.Label>
                  <Menu.Item disabled>
                    <Text size="sm" fw={500} c="dark">{user?.signInDetails?.loginId}</Text>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item leftSection={<IconSettings size={14} />}>
                    Account Settings
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item 
                    color="red" 
                    leftSection={<IconLogout size={14} />}
                    onClick={signOut}
                  >
                    Sign Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Box>

          <Container size="md">
            <Stack>
              {loading ? (
                <Center h={200}>
                  <Stack align="center">
                    <Loader color="blue" />
                    <Text c="dimmed">Fetching emails...</Text>
                  </Stack>
                </Center>
              ) : emails.length === 0 ? (
                <Card shadow="sm" padding="xl" radius="md" withBorder ta="center">
                  <IconMail size={48} color="#dee2e6" style={{ margin: '0 auto' }} />
                  <Title order={4} mt="md">No emails found</Title>
                  <Text c="dimmed" mt="xs">
                    When you receive an email to your address, it will automatically appear here.
                  </Text>
                </Card>
              ) : (
                emails.map((email) => (
                  <Card key={email.id} shadow="sm" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="xs">
                      <Title order={5} style={{ flex: 1 }}>{email.subject || "No Subject"}</Title>
                      <Text size="sm" c="dimmed">
                        {email.receivedAt ? new Date(email.receivedAt).toLocaleString() : ""}
                      </Text>
                    </Group>
                    
                    <Text size="sm" c="dimmed" mb="md">
                      From: <Text span fw={500} c="dark">{email.sender}</Text>
                    </Text>

                    <Card.Section withBorder inheritPadding py="md" bg="var(--mantine-color-gray-0)">
                      <div style={{ height: 300, overflow: 'auto', padding: '0.5rem' }}>
                        <div dangerouslySetInnerHTML={{ __html: email.bodyHtml || email.bodyText || "" }} />
                      </div>
                    </Card.Section>

                    {email.isSpam && (
                      <Group mt="md" gap="xs">
                        <IconAlertTriangle size={16} color="red" />
                        <Text size="sm" c="red" fw={500}>
                          Marked as Spam (Score: {email.spamScore})
                        </Text>
                      </Group>
                    )}
                  </Card>
                ))
              )}
            </Stack>
          </Container>
        </Box>
      )}
    </Authenticator>
  );
}
