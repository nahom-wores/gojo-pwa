/**
 * Messages Page - Placeholder for messaging feature
 * PWA-style messaging interface
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Messages: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Mock conversations for demo
  const mockConversations = [
    {
      id: '1',
      name: 'Abebe Kebede',
      property: '2BR Apartment in Bole',
      lastMessage: 'Yes, the property is still available for viewing.',
      time: '2m ago',
      unread: true,
      avatar: null,
    },
    {
      id: '2',
      name: 'Sara Tadesse',
      property: 'Modern Villa in CMC',
      lastMessage: 'When would you like to schedule a visit?',
      time: '1h ago',
      unread: true,
      avatar: null,
    },
    {
      id: '3',
      name: 'Daniel Haile',
      property: 'Office Space in Kirkos',
      lastMessage: 'The rent includes parking space.',
      time: '3h ago',
      unread: false,
      avatar: null,
    },
  ];

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Messages - Gojo Rental</title>
        </Helmet>
        <Layout showMobileSearch={false}>
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <MessageCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Log in to see messages</h1>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Once you log in, you'll find messages from property owners and tenants here.
            </p>
            <Link to="/auth">
              <Button size="lg">Log in</Button>
            </Link>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Messages - Gojo Rental</title>
      </Helmet>
      <Layout showMobileSearch={false}>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border md:border-none">
            <div className="p-4 md:p-6">
              <h1 className="text-2xl font-bold text-foreground">Messages</h1>
            </div>
            
            {/* Search */}
            <div className="px-4 pb-4 md:px-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-12 pr-4 py-3 bg-secondary rounded-full border border-border focus:border-primary outline-none text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Conversations List */}
          <div className="divide-y divide-border">
            {mockConversations.map((conversation) => (
              <button
                key={conversation.id}
                className="w-full p-4 flex items-start gap-4 hover:bg-secondary/50 transition-colors text-left"
              >
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-primary">
                    {conversation.name.charAt(0)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`font-semibold text-foreground truncate ${conversation.unread ? 'font-bold' : ''}`}>
                      {conversation.name}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mb-1">
                    {conversation.property}
                  </p>
                  <p className={`text-sm truncate ${conversation.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Unread indicator */}
                {conversation.unread && (
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </button>
            ))}
          </div>

          {/* Empty State (hidden for now since we have mock data) */}
          {mockConversations.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                <MessageCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No messages yet</h2>
              <p className="text-muted-foreground max-w-sm">
                When you contact property owners or receive inquiries, your conversations will appear here.
              </p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Messages;
