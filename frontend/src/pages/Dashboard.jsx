import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { io } from 'socket.io-client';
import CropModal from '../components/CropModal';
import AdminServerSettings from '../components/AdminServerSettings';
import { 
  Shield, 
  UserCheck, 
  Sparkles, 
  MessageSquare, 
  Info, 
  ChevronLeft, 
  Save, 
  AlertTriangle,
  CheckCircle,
  Eye,
  FileText,
  Send,
  Megaphone,
  Ticket,
  Trash2,
  Server,
  Edit3,
  Plus,
  Video,
  BarChart2,
  ShieldAlert,
  Home,
  LogOut,
  RotateCw,
  Mic,
  Webhook,
  Link,
  Radio,
  Layers,
  Copy,
  PlusCircle,
  Filter,
  X
} from 'lucide-react';

const Youtube = ({ size = 24, className = '', style = {} }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
    style={style}
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.969.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.389-.507a3.007 3.007 0 0 0 2.11-2.11C24 15.969 24 12 24 12s0-3.969-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);


// Discord Message Preview Component
function DiscordMessagePreview({ 
  botUser, 
  guildName, 
  guildIcon, 
  message, 
  buttonEnabled, 
  buttonLabel, 
  embedEnabled, 
  embedTitle, 
  embedDesc, 
  embedColor, 
  embedThumb, 
  embedImage,
  isDM = false,
  // New props for expanded announcement features:
  pingType = 'none',
  pingRoleId = '',
  roles = [],
  embedAuthorEnabled = false,
  embedAuthorName = '',
  embedAuthorIcon = '',
  embedAuthorUrl = '',
  embedFooterEnabled = false,
  embedFooterText = '',
  embedFooterIcon = '',
  embedFields = [],
  buttons = [],
  customWebhookName = '',
  customWebhookAvatar = ''
}) {
  // Resolve placeholders
  const resolvePlaceholders = (text) => {
    if (!text) return '';
    return text
      .replace(/{username}/g, botUser?.username || 'Member')
      .replace(/{server}/g, guildName || 'Server');
  };

  // Prepend source header if it's a DM
  let contentText = resolvePlaceholders(message);
  if (isDM) {
    if (contentText) {
      contentText = `Sent from: **${guildName}**\n\n` + contentText;
    } else {
      contentText = `Sent from: **${guildName}**`;
    }
  }

  // Parse markdown bold **text** to <strong> tags for visual correctness
  const formatMarkdown = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} style={{ color: '#ffffff' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const botAvatar = customWebhookAvatar || (botUser?.avatar 
    ? `https://cdn.discordapp.com/avatars/${botUser.id}/${botUser.avatar}.png`
    : 'https://cdn.discordapp.com/embed/avatars/0.png');

  // Construct Ping mention preview node
  let pingPrefixNode = null;
  if (!isDM && pingType && pingType !== 'none') {
    let pingText = '';
    let pingColor = '#c9cdfb';
    if (pingType === 'everyone') {
      pingText = '@everyone';
    } else if (pingType === 'here') {
      pingText = '@here';
    } else if (pingType === 'role' && pingRoleId) {
      const targetRole = roles?.find(r => r.id === pingRoleId);
      pingText = targetRole ? `@${targetRole.name}` : '@deleted-role';
      if (targetRole && targetRole.color && targetRole.color !== '#000000') {
        pingColor = targetRole.color;
      }
    }

    if (pingText) {
      pingPrefixNode = (
        <span style={{ 
          backgroundColor: 'rgba(88, 101, 242, 0.3)', 
          color: pingColor, 
          padding: '0 4px', 
          borderRadius: '3px', 
          fontWeight: '500',
          marginRight: '6px',
          fontSize: '0.9rem',
          userSelect: 'none'
        }}>
          {pingText}
        </span>
      );
    }
  }

  return (
    <div style={{
      backgroundColor: '#313338',
      borderRadius: '12px',
      padding: '16px',
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      color: '#dbdee1',
      fontSize: '0.95rem',
      lineHeight: '1.375rem',
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      userSelect: 'none',
      width: '100%',
      maxWidth: '520px',
      height: 'fit-content',
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <img 
          src={botAvatar} 
          alt="Avatar" 
          style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }}
        />
        
        {/* Message body container */}
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: '600', color: '#f2f3f5', fontSize: '1rem' }}>
              {customWebhookName || 'TIMO X MODE'}
            </span>
            <span style={{
              backgroundColor: '#5865F2',
              color: '#ffffff',
              fontSize: '0.625rem',
              fontWeight: '700',
              padding: '1px 4px',
              borderRadius: '3px',
              display: 'inline-flex',
              alignItems: 'center',
              lineHeight: '0.8rem',
              height: '14px'
            }}>
              BOT
            </span>
            <span style={{ fontSize: '0.75rem', color: '#949ba4', marginLeft: '4px' }}>
              Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Message Content Text (including Ping badge) */}
          {(pingPrefixNode || contentText) && (
            <div style={{ color: '#dbdee1', whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '4px', fontSize: '0.9375rem' }}>
              {pingPrefixNode}
              {formatMarkdown(contentText)}
            </div>
          )}

          {/* Embed Card */}
          {embedEnabled && (embedTitle || embedDesc || (embedFields && embedFields.length > 0)) && (
            <div style={{
              display: 'flex',
              marginTop: '8px',
              maxWidth: '520px',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: '#2b2d31',
              borderLeft: `4px solid ${embedColor || '#2563eb'}`
            }}>
              {/* Embed Content Wrapper */}
              <div style={{ display: 'flex', padding: '12px 16px', flexGrow: 1, gap: '16px', justifyContent: 'space-between', minWidth: 0 }}>
                {/* Embed Main Text */}
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  
                  {/* Embed Author */}
                  {((embedAuthorEnabled && embedAuthorName) || (!embedAuthorEnabled && guildName)) && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      {(embedAuthorEnabled ? embedAuthorIcon : guildIcon) ? (
                        <img 
                          src={embedAuthorEnabled ? embedAuthorIcon : guildIcon} 
                          alt="" 
                          style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                      ) : null}
                      {embedAuthorEnabled && embedAuthorUrl ? (
                        <a 
                          href={embedAuthorUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          style={{ fontSize: '0.875rem', fontWeight: '600', color: '#ffffff', textDecoration: 'none' }}
                          onClick={(e) => e.preventDefault()}
                        >
                          {resolvePlaceholders(embedAuthorName)}
                        </a>
                      ) : (
                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#ffffff' }}>
                          {embedAuthorEnabled ? resolvePlaceholders(embedAuthorName) : guildName}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Embed Title */}
                  {embedTitle && (
                    <div style={{ fontWeight: '600', color: '#ffffff', fontSize: '1rem', marginBottom: '8px', wordBreak: 'break-word' }}>
                      {resolvePlaceholders(embedTitle)}
                    </div>
                  )}

                  {/* Embed Description */}
                  {embedDesc && (
                    <div style={{ fontSize: '0.875rem', color: '#dbdee1', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {resolvePlaceholders(embedDesc)}
                    </div>
                  )}

                  {/* Embed Fields */}
                  {embedFields && embedFields.length > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '8px 16px', 
                      marginTop: '12px',
                      marginBottom: '4px' 
                    }}>
                      {embedFields.map((field, idx) => {
                        if (!field.name || !field.value) return null;
                        const width = field.inline ? 'calc(33.3% - 11px)' : '100%';
                        return (
                          <div 
                            key={idx} 
                            style={{ 
                              flex: `1 0 ${field.inline ? '120px' : '100%'}`, 
                              maxWidth: width,
                              wordBreak: 'break-word' 
                            }}
                          >
                            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#ffffff', marginBottom: '2px' }}>
                              {resolvePlaceholders(field.name)}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: '#dbdee1', whiteSpace: 'pre-wrap' }}>
                              {resolvePlaceholders(field.value)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Large Image */}
                  {embedImage && (
                    <div style={{ marginTop: '12px', borderRadius: '4px', overflow: 'hidden', maxWidth: '100%', maxHeight: '300px' }}>
                      <img src={embedImage} alt="" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '4px' }} />
                    </div>
                  )}

                  {/* Embed Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', color: '#949ba4', fontSize: '0.75rem' }}>
                    {(embedFooterEnabled ? embedFooterIcon : guildIcon) ? (
                      <img 
                        src={embedFooterEnabled ? embedFooterIcon : guildIcon} 
                        alt="" 
                        style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                    ) : null}
                    <span>{embedFooterEnabled ? resolvePlaceholders(embedFooterText) : `${guildName} Official Announcement`}</span>
                    <span>•</span>
                    <span>Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                </div>

                {/* Thumbnail (if set) */}
                {embedThumb && (
                  <div style={{ flexShrink: 0, width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden' }}>
                    <img src={embedThumb} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {((buttons && buttons.length > 0) || (buttonEnabled && buttonLabel)) && (
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {buttons && buttons.length > 0 ? (
                buttons.map((btn, idx) => (
                  <span 
                    key={idx}
                    style={{
                      backgroundColor: '#4e5058',
                      color: '#ffffff',
                      padding: '6px 16px',
                      borderRadius: '3px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{btn.label}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </span>
                ))
              ) : (
                <span 
                  style={{
                    backgroundColor: '#4e5058',
                    color: '#ffffff',
                    padding: '6px 16px',
                    borderRadius: '3px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <span>{buttonLabel}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </span>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ guildId, guildName, guildIcon, memberCount, onBack, user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [voiceChannels, setVoiceChannels] = useState([]);
  const [settings, setSettings] = useState(null);
  const [savedSettings, setSavedSettings] = useState(null);
  const [adminHasUnsavedChanges, setAdminHasUnsavedChanges] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Antinuke Whitelist state
  const [allMembers, setAllMembers] = useState([]);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [searchedMembers, setSearchedMembers] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedWhitelistEvents, setSelectedWhitelistEvents] = useState([]);
  const [failedIds, setFailedIds] = useState(new Set());
  const [modWhitelistSearchQuery, setModWhitelistSearchQuery] = useState('');
  const [modWhitelistSearchedMembers, setModWhitelistSearchedMembers] = useState([]);
  const [modWhitelistSearchLoading, setModWhitelistSearchLoading] = useState(false);

  const [logs, setLogs] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  // Word Filter State
  const [wordFilterLogs, setWordFilterLogs] = useState([]);
  const [wordFilterNewWord, setWordFilterNewWord] = useState('');
  const [wordFilterNewCategory, setWordFilterNewCategory] = useState('custom');
  const [wordFilterBulkInput, setWordFilterBulkInput] = useState('');
  const [showWordFilterBulk, setShowWordFilterBulk] = useState(false);
  const [wordFilterLogsLoading, setWordFilterLogsLoading] = useState(false);

  // Custom Mass-DM Broadcast State
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastButtonEnabled, setBroadcastButtonEnabled] = useState(false);
  const [broadcastButtonLabel, setBroadcastButtonLabel] = useState('');
  const [broadcastButtonUrl, setBroadcastButtonUrl] = useState('');
  const [broadcastButtons, setBroadcastButtons] = useState([]); // Multiple buttons support
  const [broadcastEmbedEnabled, setBroadcastEmbedEnabled] = useState(false);
  const [broadcastEmbedTitle, setBroadcastEmbedTitle] = useState('');
  const [broadcastEmbedDesc, setBroadcastEmbedDesc] = useState('');
  const [broadcastEmbedColor, setBroadcastEmbedColor] = useState('#2563eb');
  const [broadcastEmbedThumb, setBroadcastEmbedThumb] = useState('');
  const [broadcastEmbedImage, setBroadcastEmbedImage] = useState('');
  
  // Expanded Mass DM embed customization
  const [broadcastEmbedAuthorEnabled, setBroadcastEmbedAuthorEnabled] = useState(false);
  const [broadcastEmbedAuthorName, setBroadcastEmbedAuthorName] = useState('');
  const [broadcastEmbedAuthorIcon, setBroadcastEmbedAuthorIcon] = useState('');
  const [broadcastEmbedAuthorUrl, setBroadcastEmbedAuthorUrl] = useState('');
  const [broadcastEmbedFooterEnabled, setBroadcastEmbedFooterEnabled] = useState(false);
  const [broadcastEmbedFooterText, setBroadcastEmbedFooterText] = useState('');
  const [broadcastEmbedFooterIcon, setBroadcastEmbedFooterIcon] = useState('');
  const [broadcastEmbedFields, setBroadcastEmbedFields] = useState([]);
  
  // Mass DM filters
  const [broadcastExcludeRole, setBroadcastExcludeRole] = useState('');
  const [broadcastDelayInterval, setBroadcastDelayInterval] = useState(1);
  const [broadcastIsScheduled, setBroadcastIsScheduled] = useState(false);
  const [broadcastScheduledTime, setBroadcastScheduledTime] = useState('');
  const [scheduledDMs, setScheduledDMs] = useState([]);
  const [broadcastsList, setBroadcastsList] = useState([]);
  
  // Active broadcast progress tracking
  const [activeBroadcastProgress, setActiveBroadcastProgress] = useState(null);
  const [broadcasting, setBroadcasting] = useState(false);

  // Channel Publisher State
  const [pubChannelId, setPubChannelId] = useState('');
  const [pubMessage, setPubMessage] = useState('');
  const [pubButtonEnabled, setPubButtonEnabled] = useState(false);
  const [pubButtonLabel, setPubButtonLabel] = useState('');
  const [pubButtonUrl, setPubButtonUrl] = useState('');
  
  // Expanded announcement features state hooks
  const [pubPingType, setPubPingType] = useState('none'); // 'none' | 'everyone' | 'here' | 'role'
  const [pubPingRoleId, setPubPingRoleId] = useState('');
  const [pubButtons, setPubButtons] = useState([]); // Array of { label, url }
  const [pubEmbedAuthorEnabled, setPubEmbedAuthorEnabled] = useState(false);
  const [pubEmbedAuthorName, setPubEmbedAuthorName] = useState('');
  const [pubEmbedAuthorIcon, setPubEmbedAuthorIcon] = useState('');
  const [pubEmbedAuthorUrl, setPubEmbedAuthorUrl] = useState('');
  const [pubEmbedFooterEnabled, setPubEmbedFooterEnabled] = useState(false);
  const [pubEmbedFooterText, setPubEmbedFooterText] = useState('');
  const [pubEmbedFooterIcon, setPubEmbedFooterIcon] = useState('');
  const [pubEmbedFields, setPubEmbedFields] = useState([]); // Array of { name, value, inline }

  const [pubEmbedEnabled, setPubEmbedEnabled] = useState(false);
  const [pubEmbedTitle, setPubEmbedTitle] = useState('');
  const [pubEmbedDesc, setPubEmbedDesc] = useState('');
  const [pubEmbedColor, setPubEmbedColor] = useState('#2563eb');
  const [pubEmbedThumb, setPubEmbedThumb] = useState('');
  const [pubEmbedImage, setPubEmbedImage] = useState('');
  const [publishing, setPublishing] = useState(false);

  const [resolvingChannel, setResolvingChannel] = useState(false);
  const [resolveSuccessMsg, setResolveSuccessMsg] = useState('');

  const handleResolveYoutubeChannel = async () => {
    const channelUrlInput = settings?.youtube?.channelUrl;
    if (!channelUrlInput) {
      setErrorMsg('Please enter a YouTube channel URL or handle.');
      return;
    }
    
    setResolvingChannel(true);
    setResolveSuccessMsg('');
    setErrorMsg(null);
    try {
      const res = await api.resolveYoutubeChannel(guildId, channelUrlInput);
      handleInputChange('youtube.channelId', res.channelId);
      handleInputChange('youtube.channelName', res.channelName);
      handleInputChange('youtube.channelUrl', res.channelUrl);
      setResolveSuccessMsg(`Successfully connected to channel: ${res.channelName}`);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to resolve YouTube channel.');
    } finally {
      setResolvingChannel(false);
    }
  };

  // Scheduling & Template states
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduledAnnouncements, setScheduledAnnouncements] = useState([]);
  
  const [templates, setTemplates] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateTypeForModal, setTemplateTypeForModal] = useState('announcement');

  // Premium Polls State Hooks
  const [polls, setPolls] = useState([]);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollDescription, setPollDescription] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollChannelId, setPollChannelId] = useState('');
  const [pollMultipleChoice, setPollMultipleChoice] = useState(false);
  const [pollAnonymous, setPollAnonymous] = useState(false);
  const [pollShowResultsBeforeEnding, setPollShowResultsBeforeEnding] = useState(true);
  const [pollExpiresAt, setPollExpiresAt] = useState('');
  const [pollColor, setPollColor] = useState('#2563eb');
  const [pollImageUrl, setPollImageUrl] = useState('');
  const [pollThumbnailUrl, setPollThumbnailUrl] = useState('');
  const [creatingPoll, setCreatingPoll] = useState(false);

  // Ticket Category Management State
  const [serverEmojis, setServerEmojis] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null); // null | { id, label, description, emoji, channelPrefix }
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerTab, setEmojiPickerTab] = useState('unicode'); // 'unicode' | 'server'
  const [uploadingEmoji, setUploadingEmoji] = useState(false);


  // Webhook Announcement States
  const [webhookChannelId, setWebhookChannelId] = useState('');
  const [useCustomWebhookUrl, setUseCustomWebhookUrl] = useState(false);
  const [customWebhookUrlInput, setCustomWebhookUrlInput] = useState('');
  const [webhookDisplayName, setWebhookDisplayName] = useState('');
  const [webhookDisplayAvatar, setWebhookDisplayAvatar] = useState('');

  const [webhookMessageContent, setWebhookMessageContent] = useState('');
  const [webhookPingType, setWebhookPingType] = useState('none');
  const [webhookPingRoleId, setWebhookPingRoleId] = useState('');

  const [webhookEmbedEnabled, setWebhookEmbedEnabled] = useState(true);
  const [webhookEmbedTitle, setWebhookEmbedTitle] = useState('');
  const [webhookEmbedTitleUrl, setWebhookEmbedTitleUrl] = useState('');
  const [webhookEmbedDesc, setWebhookEmbedDesc] = useState('');
  const [webhookEmbedColor, setWebhookEmbedColor] = useState('#2563eb');

  const [webhookAuthorEnabled, setWebhookAuthorEnabled] = useState(false);
  const [webhookAuthorName, setWebhookAuthorName] = useState('');
  const [webhookAuthorIcon, setWebhookAuthorIcon] = useState('');
  const [webhookAuthorUrl, setWebhookAuthorUrl] = useState('');

  const [webhookThumbUrl, setWebhookThumbUrl] = useState('');
  const [webhookImageUrl, setWebhookImageUrl] = useState('');

  const [webhookFooterEnabled, setWebhookFooterEnabled] = useState(false);
  const [webhookFooterText, setWebhookFooterText] = useState('');
  const [webhookFooterIcon, setWebhookFooterIcon] = useState('');

  const [webhookTimestamp, setWebhookTimestamp] = useState(true);
  const [webhookEmbedFields, setWebhookEmbedFields] = useState([]);
  const [webhookButtons, setWebhookButtons] = useState([]);

  // Webhook Templates & Actions
  const [webhookTemplates, setWebhookTemplates] = useState([]);
  const [webhookTemplateTitle, setWebhookTemplateTitle] = useState('');
  const [sendingWebhook, setSendingWebhook] = useState(false);
  const [savingWebhookTemplate, setSavingWebhookTemplate] = useState(false);

  const fetchWebhookTemplates = async () => {
    try {
      const data = await api.getWebhookTemplates(guildId);
      setWebhookTemplates(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendWebhookAnnouncement = async () => {
    if (!webhookChannelId && !useCustomWebhookUrl) {
      setErrorMsg('Please select a target channel or enter a custom Webhook URL.');
      return;
    }
    if (useCustomWebhookUrl && !customWebhookUrlInput) {
      setErrorMsg('Please enter a valid Discord Webhook URL.');
      return;
    }
    if (!webhookMessageContent && (!webhookEmbedEnabled || (!webhookEmbedTitle && !webhookEmbedDesc && webhookEmbedFields.length === 0))) {
      setErrorMsg('Cannot send an empty announcement. Please enter message content or fill out an embed title/description.');
      return;
    }

    setSendingWebhook(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const payload = {
        channelId: useCustomWebhookUrl ? '' : webhookChannelId,
        customWebhookUrl: useCustomWebhookUrl ? customWebhookUrlInput : '',
        webhookName: webhookDisplayName,
        webhookAvatar: webhookDisplayAvatar,
        content: webhookMessageContent,
        ping: {
          type: webhookPingType,
          roleId: webhookPingRoleId
        },
        embed: {
          enabled: webhookEmbedEnabled,
          title: webhookEmbedTitle,
          titleUrl: webhookEmbedTitleUrl,
          description: webhookEmbedDesc,
          color: webhookEmbedColor,
          author: {
            enabled: webhookAuthorEnabled,
            name: webhookAuthorName,
            icon: webhookAuthorIcon,
            url: webhookAuthorUrl
          },
          thumbnail: webhookThumbUrl,
          image: webhookImageUrl,
          footer: {
            enabled: webhookFooterEnabled,
            text: webhookFooterText,
            icon: webhookFooterIcon
          },
          timestamp: webhookTimestamp,
          fields: webhookEmbedFields
        },
        buttons: webhookButtons
      };

      const res = await api.sendWebhookAnnouncement(guildId, payload);
      showNotification(res.message || 'Webhook Announcement sent successfully!');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to send Webhook Announcement.');
    } finally {
      setSendingWebhook(false);
    }
  };

  const handleSaveWebhookTemplate = async () => {
    if (!webhookTemplateTitle) {
      setErrorMsg('Please enter a template title to save.');
      return;
    }

    setSavingWebhookTemplate(true);
    try {
      const templateData = {
        title: webhookTemplateTitle,
        webhookName: webhookDisplayName,
        webhookAvatar: webhookDisplayAvatar,
        channelId: webhookChannelId,
        customWebhookUrl: useCustomWebhookUrl ? customWebhookUrlInput : '',
        content: webhookMessageContent,
        pingType: webhookPingType,
        pingRoleId: webhookPingRoleId,
        embedEnabled: webhookEmbedEnabled,
        embedTitle: webhookEmbedTitle,
        embedTitleUrl: webhookEmbedTitleUrl,
        embedDesc: webhookEmbedDesc,
        embedColor: webhookEmbedColor,
        embedAuthorEnabled: webhookAuthorEnabled,
        embedAuthorName: webhookAuthorName,
        embedAuthorIcon: webhookAuthorIcon,
        embedAuthorUrl: webhookAuthorUrl,
        embedThumb: webhookThumbUrl,
        embedImage: webhookImageUrl,
        embedFooterEnabled: webhookFooterEnabled,
        embedFooterText: webhookFooterText,
        embedFooterIcon: webhookFooterIcon,
        embedTimestamp: webhookTimestamp,
        embedFields: webhookEmbedFields,
        buttons: webhookButtons
      };

      const res = await api.saveWebhookTemplate(guildId, templateData);
      showNotification(res.message || 'Template saved successfully!');
      setWebhookTemplateTitle('');
      fetchWebhookTemplates();
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to save Webhook template.');
    } finally {
      setSavingWebhookTemplate(false);
    }
  };

  const handleLoadWebhookTemplate = (tpl) => {
    if (!tpl) return;
    setWebhookDisplayName(tpl.webhookName || '');
    setWebhookDisplayAvatar(tpl.webhookAvatar || '');
    if (tpl.channelId) setWebhookChannelId(tpl.channelId);
    if (tpl.customWebhookUrl) {
      setUseCustomWebhookUrl(true);
      setCustomWebhookUrlInput(tpl.customWebhookUrl);
    } else {
      setUseCustomWebhookUrl(false);
    }
    setWebhookMessageContent(tpl.content || '');
    setWebhookPingType(tpl.pingType || 'none');
    setWebhookPingRoleId(tpl.pingRoleId || '');
    setWebhookEmbedEnabled(tpl.embedEnabled !== false);
    setWebhookEmbedTitle(tpl.embedTitle || '');
    setWebhookEmbedTitleUrl(tpl.embedTitleUrl || '');
    setWebhookEmbedDesc(tpl.embedDesc || '');
    setWebhookEmbedColor(tpl.embedColor || '#2563eb');
    setWebhookAuthorEnabled(!!tpl.embedAuthorEnabled);
    setWebhookAuthorName(tpl.embedAuthorName || '');
    setWebhookAuthorIcon(tpl.embedAuthorIcon || '');
    setWebhookAuthorUrl(tpl.embedAuthorUrl || '');
    setWebhookThumbUrl(tpl.embedThumb || '');
    setWebhookImageUrl(tpl.embedImage || '');
    setWebhookFooterEnabled(!!tpl.embedFooterEnabled);
    setWebhookFooterText(tpl.embedFooterText || '');
    setWebhookFooterIcon(tpl.embedFooterIcon || '');
    setWebhookTimestamp(tpl.embedTimestamp !== false);
    setWebhookEmbedFields(tpl.embedFields || []);
    setWebhookButtons(tpl.buttons || []);
    showNotification(`Loaded template: "${tpl.title}"`);
  };

  const handleDeleteWebhookTemplate = async (templateId) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    try {
      await api.deleteWebhookTemplate(guildId, templateId);
      showNotification('Template deleted successfully.');
      fetchWebhookTemplates();
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to delete template.');
    }
  };




  const handleSendBroadcast = async (e) => {
    if (e) e.preventDefault();
    if (!broadcastMessage && (!broadcastEmbedEnabled || (!broadcastEmbedTitle && !broadcastEmbedDesc && broadcastEmbedFields.length === 0))) {
      setErrorMsg('Please enter a message or set up a valid embed title/description.');
      return;
    }

    if (broadcastIsScheduled && !broadcastScheduledTime) {
      setErrorMsg('Please select a release date & time for your scheduled broadcast.');
      return;
    }
    
    // Validation for link buttons
    let targetButtons = [...broadcastButtons];
    if (broadcastButtonEnabled && broadcastButtonLabel && broadcastButtonUrl) {
      targetButtons.push({ label: broadcastButtonLabel, url: broadcastButtonUrl });
    }
    const invalidButton = targetButtons.find(btn => !btn.label || !btn.url);
    if (invalidButton) {
      setErrorMsg('All enabled buttons must have a valid label and URL.');
      return;
    }

    if (!window.confirm(broadcastIsScheduled 
      ? `Are you sure you want to schedule this DM broadcast to members of ${guildName}?` 
      : `Are you sure you want to broadcast this DM to members of ${guildName}? This action cannot be undone.`
    )) {
      return;
    }

    setErrorMsg(null);
    setSuccessMsg(null);

    const payload = {
      message: broadcastMessage,
      buttons: targetButtons,
      filterRole: '',
      excludeRole: broadcastExcludeRole,
      delayInterval: Number(broadcastDelayInterval) || 1,
      embed: {
        enabled: broadcastEmbedEnabled,
        title: broadcastEmbedTitle,
        description: broadcastEmbedDesc,
        color: broadcastEmbedColor,
        thumbnail: broadcastEmbedThumb,
        image: broadcastEmbedImage,
        author: {
          enabled: broadcastEmbedAuthorEnabled,
          name: broadcastEmbedAuthorName,
          iconURL: broadcastEmbedAuthorIcon,
          url: broadcastEmbedAuthorUrl
        },
        footer: {
          enabled: broadcastEmbedFooterEnabled,
          text: broadcastEmbedFooterText,
          iconURL: broadcastEmbedFooterIcon
        },
        fields: broadcastEmbedFields
      }
    };

    try {
      if (broadcastIsScheduled) {
        payload.publishAt = broadcastScheduledTime;
        const res = await api.scheduleDM(guildId, payload);
        showNotification(res.message || 'Mass DM broadcast successfully scheduled!');
        fetchScheduledDMs();
      } else {
        setBroadcasting(true);
        setActiveBroadcastProgress({
          status: 'sending',
          totalTargets: 0,
          successCount: 0,
          failCount: 0
        });
        const res = await api.sendMassDM(guildId, payload);
        showNotification(res.message || 'Mass DM broadcast successfully started!');
        fetchBroadcastsHistory();
      }
      
      // Reset form
      setBroadcastMessage('');
      setBroadcastButtonEnabled(false);
      setBroadcastButtonLabel('');
      setBroadcastButtonUrl('');
      setBroadcastButtons([]);
      setBroadcastEmbedEnabled(false);
      setBroadcastEmbedTitle('');
      setBroadcastEmbedDesc('');
      setBroadcastEmbedThumb('');
      setBroadcastEmbedImage('');
      setBroadcastEmbedAuthorEnabled(false);
      setBroadcastEmbedAuthorName('');
      setBroadcastEmbedAuthorIcon('');
      setBroadcastEmbedAuthorUrl('');
      setBroadcastEmbedFooterEnabled(false);
      setBroadcastEmbedFooterText('');
      setBroadcastEmbedFooterIcon('');
      setBroadcastEmbedFields([]);
      setBroadcastExcludeRole('');
      setBroadcastDelayInterval(1);
      setBroadcastIsScheduled(false);
      setBroadcastScheduledTime('');

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to trigger broadcast DMs.');
      if (!broadcastIsScheduled) {
        setActiveBroadcastProgress(null);
      }
    } finally {
      setBroadcasting(false);
    }
  };

  const handleSendTestDM = async (e) => {
    if (e) e.preventDefault();
    if (!broadcastMessage && (!broadcastEmbedEnabled || (!broadcastEmbedTitle && !broadcastEmbedDesc && broadcastEmbedFields.length === 0))) {
      setErrorMsg('Please enter a message or set up a valid embed title/description before testing.');
      return;
    }

    let targetButtons = [...broadcastButtons];
    if (broadcastButtonEnabled && broadcastButtonLabel && broadcastButtonUrl) {
      targetButtons.push({ label: broadcastButtonLabel, url: broadcastButtonUrl });
    }

    try {
      showNotification('Sending test DM to your Discord account...');
      const res = await api.sendTestDM(guildId, {
        message: broadcastMessage,
        buttons: targetButtons,
        embed: {
          enabled: broadcastEmbedEnabled,
          title: broadcastEmbedTitle,
          description: broadcastEmbedDesc,
          color: broadcastEmbedColor,
          thumbnail: broadcastEmbedThumb,
          image: broadcastEmbedImage,
          author: {
            enabled: broadcastEmbedAuthorEnabled,
            name: broadcastEmbedAuthorName,
            iconURL: broadcastEmbedAuthorIcon,
            url: broadcastEmbedAuthorUrl
          },
          footer: {
            enabled: broadcastEmbedFooterEnabled,
            text: broadcastEmbedFooterText,
            iconURL: broadcastEmbedFooterIcon
          },
          fields: broadcastEmbedFields
        }
      });
      showNotification(res.message || 'Test DM sent successfully!');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to send test DM.');
    }
  };

  const handleSendChannelMessage = async (e) => {
    if (e) e.preventDefault();
    if (!pubChannelId) {
      setErrorMsg('Please select a target channel.');
      return;
    }

    if (!pubMessage && (!pubEmbedEnabled || (!pubEmbedTitle && !pubEmbedDesc && pubEmbedFields.length === 0))) {
      setErrorMsg('Please enter a message, embed content, or add fields to send.');
      return;
    }

    if (isScheduled && !scheduledTime) {
      setErrorMsg('Please select a release date & time for your scheduled announcement.');
      return;
    }

    // Validation for link buttons
    let targetButtons = [...pubButtons];
    if (pubButtonEnabled && pubButtonLabel && pubButtonUrl) {
      targetButtons.push({ label: pubButtonLabel, url: pubButtonUrl });
    }
    const invalidButton = targetButtons.find(btn => !btn.label || !btn.url);
    if (invalidButton) {
      setErrorMsg('All enabled buttons must have a valid label and URL.');
      return;
    }

    const channelName = channels.find(c => c.id === pubChannelId)?.name || 'selected channel';
    
    if (isScheduled) {
      if (!window.confirm(`Are you sure you want to schedule this announcement to #${channelName} at ${new Date(scheduledTime).toLocaleString()}?`)) {
        return;
      }
    } else {
      if (!window.confirm(`Are you sure you want to send this styled message to #${channelName}?`)) {
        return;
      }
    }

    setPublishing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const payload = {
        channelId: pubChannelId,
        message: pubMessage,
        ping: {
          type: pubPingType,
          roleId: pubPingRoleId
        },
        buttons: targetButtons,
        embed: {
          enabled: pubEmbedEnabled,
          title: pubEmbedTitle,
          description: pubEmbedDesc,
          color: pubEmbedColor,
          thumbnail: pubEmbedThumb,
          image: pubEmbedImage,
          author: {
            enabled: pubEmbedAuthorEnabled,
            name: pubEmbedAuthorName,
            iconURL: pubEmbedAuthorIcon,
            url: pubEmbedAuthorUrl
          },
          footer: {
            enabled: pubEmbedFooterEnabled,
            text: pubEmbedFooterText,
            iconURL: pubEmbedFooterIcon
          },
          fields: pubEmbedFields
        }
      };

      if (isScheduled) {
        payload.publishAt = scheduledTime;
        const res = await api.scheduleAnnouncement(guildId, payload);
        showNotification(res.message || 'Announcement scheduled successfully!');
        fetchScheduledAnnouncements();
      } else {
        const res = await api.sendChannelMessage(guildId, payload);
        showNotification(res.message || 'Announcement published successfully!');
      }

      // Reset form
      setPubMessage('');
      setPubPingType('none');
      setPubPingRoleId('');
      setPubButtons([]);
      setPubButtonEnabled(false);
      setPubButtonLabel('');
      setPubButtonUrl('');
      setPubEmbedEnabled(false);
      setPubEmbedTitle('');
      setPubEmbedDesc('');
      setPubEmbedThumb('');
      setPubEmbedImage('');
      setPubEmbedAuthorEnabled(false);
      setPubEmbedAuthorName('');
      setPubEmbedAuthorIcon('');
      setPubEmbedAuthorUrl('');
      setPubEmbedFooterEnabled(false);
      setPubEmbedFooterText('');
      setPubEmbedFooterIcon('');
      setPubEmbedFields([]);
      setIsScheduled(false);
      setScheduledTime('');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to process request.');
    } finally {
      setPublishing(false);
    }
  };

  // Templates Management Helpers
  const fetchTemplates = async (type) => {
    try {
      const data = await api.getTemplates(guildId, type);
      setTemplates(data);
    } catch (err) {
      console.error('Failed to fetch templates:', err.message);
    }
  };

  const handleSaveTemplate = async (name, type) => {
    if (!name.trim()) return;
    try {
      let data = {};
      if (type === 'announcement') {
        data = {
          message: pubMessage,
          pubPingType,
          pubPingRoleId,
          pubButtons,
          pubButtonEnabled,
          pubButtonLabel,
          pubButtonUrl,
          pubEmbedEnabled,
          pubEmbedTitle,
          pubEmbedDesc,
          pubEmbedColor,
          pubEmbedThumb,
          pubEmbedImage,
          pubEmbedAuthorEnabled,
          pubEmbedAuthorName,
          pubEmbedAuthorIcon,
          pubEmbedAuthorUrl,
          pubEmbedFooterEnabled,
          pubEmbedFooterText,
          pubEmbedFooterIcon,
          pubEmbedFields
        };
      } else {
        data = {
          message: broadcastMessage,
          broadcastExcludeRole,
          broadcastButtons,
          broadcastButtonEnabled,
          broadcastButtonLabel,
          broadcastButtonUrl,
          broadcastEmbedEnabled,
          broadcastEmbedTitle,
          broadcastEmbedDesc,
          broadcastEmbedColor,
          broadcastEmbedThumb,
          broadcastEmbedImage,
          broadcastEmbedAuthorEnabled,
          broadcastEmbedAuthorName,
          broadcastEmbedAuthorIcon,
          broadcastEmbedAuthorUrl,
          broadcastEmbedFooterEnabled,
          broadcastEmbedFooterText,
          broadcastEmbedFooterIcon,
          broadcastEmbedFields,
          broadcastDelayInterval
        };
      }

      await api.saveTemplate(guildId, { name, type, data });
      showNotification('Template saved successfully!');
      fetchTemplates(type);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save template.');
    }
  };

  const handleLoadTemplate = (tpl) => {
    const { data } = tpl;
    if (tpl.type === 'announcement') {
      setPubMessage(data.message || '');
      setPubPingType(data.pubPingType || 'none');
      setPubPingRoleId(data.pubPingRoleId || '');
      setPubButtons(data.pubButtons || []);
      setPubButtonEnabled(!!data.pubButtonEnabled);
      setPubButtonLabel(data.pubButtonLabel || '');
      setPubButtonUrl(data.pubButtonUrl || '');
      setPubEmbedEnabled(!!data.pubEmbedEnabled);
      setPubEmbedTitle(data.pubEmbedTitle || '');
      setPubEmbedDesc(data.pubEmbedDesc || '');
      setPubEmbedColor(data.pubEmbedColor || '#2563eb');
      setPubEmbedThumb(data.pubEmbedThumb || '');
      setPubEmbedImage(data.pubEmbedImage || '');
      setPubEmbedAuthorEnabled(!!data.pubEmbedAuthorEnabled);
      setPubEmbedAuthorName(data.pubEmbedAuthorName || '');
      setPubEmbedAuthorIcon(data.pubEmbedAuthorIcon || '');
      setPubEmbedAuthorUrl(data.pubEmbedAuthorUrl || '');
      setPubEmbedFooterEnabled(!!data.pubEmbedFooterEnabled);
      setPubEmbedFooterText(data.pubEmbedFooterText || '');
      setPubEmbedFooterIcon(data.pubEmbedFooterIcon || '');
      setPubEmbedFields(data.pubEmbedFields || []);
    } else {
      setBroadcastMessage(data.message || '');
      setBroadcastExcludeRole(data.broadcastExcludeRole || '');
      setBroadcastButtons(data.broadcastButtons || []);
      setBroadcastButtonEnabled(!!data.broadcastButtonEnabled);
      setBroadcastButtonLabel(data.broadcastButtonLabel || '');
      setBroadcastButtonUrl(data.broadcastButtonUrl || '');
      setBroadcastEmbedEnabled(!!data.broadcastEmbedEnabled);
      setBroadcastEmbedTitle(data.broadcastEmbedTitle || '');
      setBroadcastEmbedDesc(data.broadcastEmbedDesc || '');
      setBroadcastEmbedColor(data.broadcastEmbedColor || '#2563eb');
      setBroadcastEmbedThumb(data.broadcastEmbedThumb || '');
      setBroadcastEmbedImage(data.broadcastEmbedImage || '');
      setBroadcastEmbedAuthorEnabled(!!data.broadcastEmbedAuthorEnabled);
      setBroadcastEmbedAuthorName(data.broadcastEmbedAuthorName || '');
      setBroadcastEmbedAuthorIcon(data.broadcastEmbedAuthorIcon || '');
      setBroadcastEmbedAuthorUrl(data.broadcastEmbedAuthorUrl || '');
      setBroadcastEmbedFooterEnabled(!!data.broadcastEmbedFooterEnabled);
      setBroadcastEmbedFooterText(data.broadcastEmbedFooterText || '');
      setBroadcastEmbedFooterIcon(data.broadcastEmbedFooterIcon || '');
      setBroadcastEmbedFields(data.broadcastEmbedFields || []);
      setBroadcastDelayInterval(data.broadcastDelayInterval || 1);
    }
    showNotification(`Template "${tpl.name}" loaded successfully.`);
  };

  const handleDeleteTemplate = async (templateId, type) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    try {
      await api.deleteTemplate(guildId, templateId);
      showNotification('Template deleted successfully.');
      fetchTemplates(type);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete template.');
    }
  };

  // Scheduled Announcements helpers
  const fetchScheduledAnnouncements = async () => {
    try {
      const data = await api.getScheduledAnnouncements(guildId);
      setScheduledAnnouncements(data);
    } catch (err) {
      console.error('Failed to fetch scheduled announcements:', err.message);
    }
  };

  const handleDeleteScheduledAnnouncement = async (announcementId) => {
    if (!window.confirm('Are you sure you want to cancel and delete this scheduled announcement?')) return;
    try {
      await api.deleteScheduledAnnouncement(guildId, announcementId);
      showNotification('Scheduled announcement cancelled.');
      fetchScheduledAnnouncements();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to cancel scheduled announcement.');
    }
  };

  // Scheduled DMs & Broadcast History helpers
  const fetchScheduledDMs = async () => {
    try {
      const data = await api.getScheduledDMs(guildId);
      setScheduledDMs(data);
    } catch (err) {
      console.error('Failed to fetch scheduled DMs:', err.message);
    }
  };

  const fetchBroadcastsHistory = async () => {
    try {
      const data = await api.getBroadcasts(guildId);
      setBroadcastsList(data);
    } catch (err) {
      console.error('Failed to fetch broadcasts history:', err.message);
    }
  };

  const handleDeleteScheduledDM = async (id) => {
    if (!window.confirm('Are you sure you want to cancel and delete this scheduled DM broadcast?')) return;
    try {
      await api.deleteScheduledDM(guildId, id);
      showNotification('Scheduled DM broadcast cancelled.');
      fetchScheduledDMs();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to cancel scheduled DM broadcast.');
    }
  };

  const handleRevokeBroadcast = async (broadcastId) => {
    if (!window.confirm('WARNING: This will attempt to delete this message for all users who received it. Are you sure you want to proceed?')) return;
    try {
      await api.revokeBroadcast(guildId, broadcastId);
      showNotification('DM Revocation process started in the background.');
      fetchBroadcastsHistory();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to start DM revocation.');
    }
  };

  // Active Broadcast Cancellation
  const handleCancelActiveBroadcast = async (broadcastId) => {
    if (!window.confirm('Are you sure you want to stop this running broadcast immediately?')) return;
    try {
      const res = await api.cancelBroadcast(guildId, broadcastId);
      showNotification(res.message || 'Broadcast cancel request sent.');
      fetchBroadcastsHistory();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to cancel running broadcast.');
    }
  };

  // Premium Poll Helpers
  const fetchPolls = async () => {
    try {
      const data = await api.getPolls(guildId);
      setPolls(data);
    } catch (err) {
      console.error('Failed to fetch polls:', err.message);
    }
  };

  const handleCreatePoll = async (e) => {
    if (e) e.preventDefault();
    if (!pollChannelId) {
      setErrorMsg('Please select a target channel.');
      return;
    }
    if (!pollQuestion.trim()) {
      setErrorMsg('Please enter a question.');
      return;
    }
    const filteredOptions = pollOptions.map(opt => opt.trim()).filter(Boolean);
    if (filteredOptions.length < 2) {
      setErrorMsg('Please enter at least two options.');
      return;
    }

    setCreatingPoll(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const payload = {
      channelId: pollChannelId,
      question: pollQuestion,
      description: pollDescription,
      options: filteredOptions,
      settings: {
        multipleChoice: pollMultipleChoice,
        anonymous: pollAnonymous,
        showResultsBeforeEnding: pollShowResultsBeforeEnding,
        expiresAt: pollExpiresAt || undefined,
        color: pollColor,
        imageUrl: pollImageUrl || undefined,
        thumbnailUrl: pollThumbnailUrl || undefined
      }
    };

    try {
      await api.createPoll(guildId, payload);
      showNotification('Poll created and published to Discord successfully!');
      
      // Reset form
      setPollQuestion('');
      setPollDescription('');
      setPollOptions(['', '']);
      setPollMultipleChoice(false);
      setPollAnonymous(false);
      setPollShowResultsBeforeEnding(true);
      setPollExpiresAt('');
      setPollColor('#2563eb');
      setPollImageUrl('');
      setPollThumbnailUrl('');
      
      fetchPolls();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to create poll.');
    } finally {
      setCreatingPoll(false);
    }
  };

  const handleEndPoll = async (pollId) => {
    if (!window.confirm('Are you sure you want to end this poll immediately? Voters will not be able to vote anymore.')) return;
    try {
      await api.endPoll(guildId, pollId);
      showNotification('Poll ended successfully.');
      fetchPolls();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to end poll.');
    }
  };

  const handleDeletePoll = async (pollId) => {
    if (!window.confirm('Are you sure you want to delete this poll? The Discord message will be deleted, and all vote data will be removed.')) return;
    try {
      await api.deletePoll(guildId, pollId);
      showNotification('Poll deleted successfully.');
      fetchPolls();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete poll.');
    }
  };

  // Load Channels, Roles, and Settings
  const loadData = async (showLoadingIndicator = true) => {
    try {
      if (showLoadingIndicator) setLoading(true);
      const [chData, rData, sData, catData, vcData] = await Promise.all([
        api.getChannels(guildId),
        api.getRoles(guildId),
        api.getSettings(guildId),
        api.getCategories(guildId),
        api.getVoiceChannels(guildId)
      ]);
      setChannels(chData);
      setRoles(rData);
      if (sData) {
        if (!sData.antinuke) {
          sData.antinuke = {
            enabled: false,
            logChannelId: '',
            punishment: 'stripall',
            threshold: 3,
            timeframe: 60,
            antiBan: true,
            antiKick: true,
            antiChannelCreate: true,
            antiChannelDelete: true,
            antiRoleCreate: true,
            antiRoleDelete: true,
            antiRoleUpdate: true,
            antiWebhook: true,
            antiBot: true,
            antiGuildUpdate: false,
            antiEmoji: false,
            antiChannelEdit: false,
            whitelistedUsers: []
          };
        } else {
          if (!sData.antinuke.whitelistedUsers) {
            sData.antinuke.whitelistedUsers = [];
          } else {
            sData.antinuke.whitelistedUsers = sData.antinuke.whitelistedUsers.map(u => 
              typeof u === 'string' ? { userId: u, addedBy: 'System', events: [], username: '', displayName: '', avatar: '' } : u
            );
          }
        }

        if (sData.moderation) {
          if (!sData.moderation.whitelistedUsers) {
            sData.moderation.whitelistedUsers = [];
          } else {
            sData.moderation.whitelistedUsers = sData.moderation.whitelistedUsers.map(u => 
              typeof u === 'string' ? { userId: u, addedBy: 'System', username: '', displayName: '', avatar: '' } : u
            );
          }
        } else {
          sData.moderation = {
            spam: { enabled: false, protectedChannels: [], maxMessages: 5, timeWindow: 5000, timeoutDuration: 5 },
            links: { enabled: false, protectedChannels: [], allowedLinks: [] },
            photoSpam: { enabled: false, maxPhotos: 3, timeWindow: 10000, timeoutDuration: 10, whitelistedChannels: [] },
            whitelistedUsers: [],
            wordFilter: { enabled: false, blockedWords: [], deleteMessage: true, caseSensitive: false, detectBypass: true, warnBeforePunishment: true, maxViolations: 3, violationWindow: 300000, timeoutDuration: 10, logChannelId: '', exemptRoles: [], exemptChannels: [], exemptUsers: [] }
          };
        }
        // Ensure wordFilter defaults exist
        if (!sData.moderation.wordFilter) {
          sData.moderation.wordFilter = { enabled: false, blockedWords: [], deleteMessage: true, caseSensitive: false, detectBypass: true, warnBeforePunishment: true, maxViolations: 3, violationWindow: 300000, timeoutDuration: 10, logChannelId: '', exemptRoles: [], exemptChannels: [], exemptUsers: [] };
        }
        if (!sData.moderation.wordFilter.blockedWords) {
          sData.moderation.wordFilter.blockedWords = [];
        }
      }

      setSettings(sData);
      setSavedSettings(JSON.parse(JSON.stringify(sData)));
      setCategories(catData || []);
      setVoiceChannels(vcData || []);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load server data. Please try again.');
    } finally {
      if (showLoadingIndicator) setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, [guildId]);

  // Load members list whenever antinuke or moderation tab becomes active
  useEffect(() => {
    if (activeTab === 'antinuke' || activeTab === 'moderation') {
      const fetchMembers = async () => {
        try {
          const mData = await api.getAdminMembers(guildId).catch(() => []);
          setAllMembers(prev => {
            const antinukeIds = settings?.antinuke?.whitelistedUsers?.map(u => typeof u === 'string' ? u : u?.userId).filter(Boolean) || [];
            const moderationIds = settings?.moderation?.whitelistedUsers?.map(u => typeof u === 'string' ? u : u?.userId).filter(Boolean) || [];
            const whitelistedIds = Array.from(new Set([...antinukeIds, ...moderationIds])).filter(id => id !== 'undefined');
            
            const whitelistedInPrev = prev.filter(m => whitelistedIds.includes(m.id));
            const merged = [...(mData || [])];
            whitelistedInPrev.forEach(m => {
              if (!merged.some(x => x.id === m.id)) {
                merged.push(m);
              }
            });
            return merged;
          });
        } catch (err) {
          console.error('[Dashboard] Failed to fetch members:', err);
        }
      };
      fetchMembers();
    }
  }, [activeTab, guildId, settings?.antinuke?.whitelistedUsers, settings?.moderation?.whitelistedUsers]);

  // Load server custom emojis when ticket tab is active or emoji picker is opened
  useEffect(() => {
    if (activeTab === 'tickets' || showEmojiPicker) {
      const fetchEmojis = async () => {
        try {
          const emojiData = await api.getEmojis(guildId);
          if (Array.isArray(emojiData)) {
            setServerEmojis(emojiData);
          }
        } catch (err) {
          console.error('[Dashboard] Failed to fetch server emojis:', err);
        }
      };
      fetchEmojis();
    }
  }, [activeTab, showEmojiPicker, guildId]);

  // Whenever whitelistedUsers changes or allMembers changes, fetch details for any IDs we don't have cached yet
  useEffect(() => {
    const antinukeIds = settings?.antinuke?.whitelistedUsers?.map(u => typeof u === 'string' ? u : u?.userId).filter(Boolean) || [];
    const moderationIds = settings?.moderation?.whitelistedUsers?.map(u => typeof u === 'string' ? u : u?.userId).filter(Boolean) || [];
    const whitelistedIds = Array.from(new Set([...antinukeIds, ...moderationIds])).filter(id => id !== 'undefined');
    
    if (whitelistedIds.length === 0) return;

    const missingIds = whitelistedIds.filter(id => id && !allMembers.some(m => m.id === id) && !failedIds.has(id));
    if (missingIds.length === 0) return;

    const resolveMissing = async () => {
      const fetched = await Promise.all(
        missingIds.map(async (id) => {
          try {
            return await api.getAdminMemberDetails(guildId, id);
          } catch (e) {
            setFailedIds(prev => {
              const next = new Set(prev);
              next.add(id);
              return next;
            });
            return null;
          }
        })
      );
      const valid = fetched.filter(Boolean);
      if (valid.length > 0) {
        setAllMembers(prev => {
          const newEntries = valid.filter(v => !prev.some(m => m.id === v.id));
          return newEntries.length > 0 ? [...prev, ...newEntries] : prev;
        });
      }
    };
    resolveMissing();
  }, [settings?.antinuke?.whitelistedUsers, settings?.moderation?.whitelistedUsers, allMembers, guildId, failedIds]);

  // Debounce search effect for whitelisting members
  useEffect(() => {
    if (!memberSearchQuery.trim()) {
      setSearchedMembers([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const membersList = await api.getAdminMembers(guildId, memberSearchQuery);
        setSearchedMembers(membersList || []);
      } catch (err) {
        console.error('[Dashboard Member Search Error]', err);
      } finally {
        setSearchLoading(false);
      }
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [memberSearchQuery, guildId]);

  // Debounce search effect for moderation whitelisting members
  useEffect(() => {
    if (!modWhitelistSearchQuery.trim()) {
      setModWhitelistSearchedMembers([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setModWhitelistSearchLoading(true);
      try {
        const membersList = await api.getAdminMembers(guildId, modWhitelistSearchQuery);
        setModWhitelistSearchedMembers(membersList || []);
      } catch (err) {
        console.error('[Dashboard Moderation Whitelist Member Search Error]', err);
      } finally {
        setModWhitelistSearchLoading(false);
      }
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [modWhitelistSearchQuery, guildId]);

  // Initialize Socket.IO connection and join room
  useEffect(() => {
    const socketUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:2010'
      : window.location.origin;

    const newSocket = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });


    newSocket.emit('join_guild', guildId);

    newSocket.on('new_log', (log) => {
      setLogs(prev => [log, ...prev]);
    });

    newSocket.on('broadcast_progress', (progress) => {
      console.log('[Socket] Received broadcast progress:', progress);
      setActiveBroadcastProgress(progress);
      if (progress.status === 'completed' || progress.status === 'cancelled' || progress.status === 'failed') {
        fetchBroadcastsHistory();
        setTimeout(() => setActiveBroadcastProgress(null), 10000); // hide status after 10 seconds of completion
      }
    });

    newSocket.on('poll_update', (updatedPoll) => {
      setPolls(prev => {
        const index = prev.findIndex(p => p._id === updatedPoll._id);
        if (index > -1) {
          const newPolls = [...prev];
          newPolls[index] = updatedPoll;
          return newPolls;
        } else {
          return [updatedPoll, ...prev];
        }
      });
    });

    newSocket.on('poll_delete', ({ pollId }) => {
      setPolls(prev => prev.filter(p => p._id !== pollId));
    });

    return () => {
      newSocket.emit('leave_guild', guildId);
      newSocket.disconnect();
    };
  }, [guildId]);

  // Load templates & scheduled posts on tab changes
  useEffect(() => {
    if (activeTab === 'publish') {
      fetchTemplates('announcement');
      fetchScheduledAnnouncements();
    } else if (activeTab === 'broadcast') {
      fetchTemplates('dm');
      fetchScheduledDMs();
      fetchBroadcastsHistory();
      setActiveBroadcastProgress(null); // Reset preview
    } else if (activeTab === 'polls') {
      fetchPolls();
    }
  }, [activeTab, guildId]);

  // Load moderation logs when active tab is logs
  useEffect(() => {
    if (activeTab === 'logs') {
      api.getLogs(guildId).then(data => {
        setLogs(data);
      }).catch(err => {
        console.error('Failed to fetch moderation logs:', err.message);
      });
    }
    if (activeTab === 'word-filter') {
      setWordFilterLogsLoading(true);
      api.getWordFilterLogs(guildId).then(data => {
        setWordFilterLogs(data || []);
      }).catch(err => {
        console.error('Failed to fetch word filter logs:', err.message);
      }).finally(() => setWordFilterLogsLoading(false));
    }
  }, [activeTab, guildId]);

  const handleDragStart = (e, elementKey) => {
    e.preventDefault();
    const parent = e.currentTarget.parentElement;
    const rect = parent.getBoundingClientRect();

    const handleMouseMove = (moveEvent) => {
      const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const clientY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;

      let newX = ((clientX - rect.left) / rect.width) * 800;
      let newY = ((clientY - rect.top) / rect.height) * 450;

      newX = Math.round(Math.max(0, Math.min(800, newX)));
      newY = Math.round(Math.max(0, Math.min(450, newY)));

      handleInputChange(`welcome.${elementKey}X`, newX);
      handleInputChange(`welcome.${elementKey}Y`, newY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: true });
    document.addEventListener('touchend', handleMouseUp);
  };

  const handleToggle = (path) => {
    const parts = path.split('.');
    setSettings(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      let current = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        if (current[parts[i]] === undefined || current[parts[i]] === null) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = !current[parts[parts.length - 1]];
      return updated;
    });
  };

  const handleInputChange = (path, value) => {
    const parts = path.split('.');
    setSettings(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      let current = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        if (current[parts[i]] === undefined || current[parts[i]] === null) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return updated;
    });
  };

  const getMemberDetails = (userId) => {
    const member = allMembers.find(m => m.id === userId);
    if (member) return member;

    // Look for fallback details in settings whitelists
    const modUser = settings?.moderation?.whitelistedUsers?.find(u => u.userId === userId);
    const antiUser = settings?.antinuke?.whitelistedUsers?.find(u => typeof u === 'string' ? u === userId : u.userId === userId);

    const storedUsername = modUser?.username || (typeof antiUser === 'object' ? antiUser?.username : '');
    const storedDisplayName = modUser?.displayName || (typeof antiUser === 'object' ? antiUser?.displayName : '');
    const storedAvatar = modUser?.avatar || (typeof antiUser === 'object' ? antiUser?.avatar : '');

    return { 
      id: userId, 
      username: storedUsername || '', 
      displayName: storedDisplayName || 'Unknown User', 
      avatar: storedAvatar || null 
    };
  };

  const handleAddWhitelist = (userId, events = [], details = null) => {
    if (!settings || !settings.antinuke) return;
    const currentList = settings.antinuke.whitelistedUsers || [];
    if (!currentList.some(u => u.userId === userId)) {
      const addedBy = user ? user.username : 'Dashboard';
      const username = details ? details.username : '';
      const displayName = details ? details.displayName : '';
      const avatar = details ? details.avatar : '';
      const updatedList = [...currentList, { userId, addedBy, events, username, displayName, avatar }];
      handleInputChange('antinuke.whitelistedUsers', updatedList);
    }
  };

  const handleRemoveWhitelist = (userId) => {
    if (!settings || !settings.antinuke) return;
    const currentList = settings.antinuke.whitelistedUsers || [];
    const updatedList = currentList.filter(u => u.userId !== userId);
    handleInputChange('antinuke.whitelistedUsers', updatedList);
  };

  const handleAddModWhitelist = (userId, details = null) => {
    if (!settings || !settings.moderation) return;
    const currentList = settings.moderation.whitelistedUsers || [];
    if (!currentList.some(u => u.userId === userId)) {
      const addedBy = user ? user.username : 'Dashboard';
      const username = details ? details.username : '';
      const displayName = details ? details.displayName : '';
      const avatar = details ? details.avatar : '';
      const updatedList = [...currentList, { userId, addedBy, username, displayName, avatar }];
      handleInputChange('moderation.whitelistedUsers', updatedList);
    }
  };

  const handleRemoveModWhitelist = (userId) => {
    if (!settings || !settings.moderation) return;
    const currentList = settings.moderation.whitelistedUsers || [];
    const updatedList = currentList.filter(u => u.userId !== userId);
    handleInputChange('moderation.whitelistedUsers', updatedList);
  };

  const handleManualAddModWhitelist = async () => {
    const query = modWhitelistSearchQuery.trim();
    if (!query) return;

    const isId = /^\d{17,20}$/.test(query);
    if (isId) {
      let details = null;
      try {
        details = await api.getAdminMemberDetails(guildId, query);
        if (details) {
          setAllMembers(prev => {
            if (!prev.some(m => m.id === query)) {
              return [...prev, details];
            }
            return prev;
          });
        }
      } catch (err) {
        console.warn(`[Dashboard] Member details not found for ID ${query}:`, err);
      }
      handleAddModWhitelist(query, details);
      setModWhitelistSearchQuery('');
      setModWhitelistSearchedMembers([]);
    } else {
      if (modWhitelistSearchedMembers.length > 0) {
        const firstMatch = modWhitelistSearchedMembers.find(m => !(settings.moderation.whitelistedUsers || []).some(u => u.userId === m.id));
        if (firstMatch) {
          handleAddModWhitelist(firstMatch.id, firstMatch);
          setModWhitelistSearchQuery('');
          setModWhitelistSearchedMembers([]);
        }
      } else {
        alert('Please enter a valid Discord User ID (17-20 digits) or search/select a member.');
      }
    }
  };

  const handleManualAddWhitelist = async () => {
    const query = memberSearchQuery.trim();
    if (!query) return;

    const isId = /^\d{17,20}$/.test(query);
    if (isId) {
      let details = null;
      try {
        details = await api.getAdminMemberDetails(guildId, query);
        if (details) {
          setAllMembers(prev => {
            if (!prev.some(m => m.id === query)) {
              return [...prev, details];
            }
            return prev;
          });
        }
      } catch (err) {
        console.warn(`[Dashboard] Member details not found for ID ${query}:`, err);
      }
      handleAddWhitelist(query, selectedWhitelistEvents, details);
      setMemberSearchQuery('');
      setSelectedWhitelistEvents([]);
      setSearchedMembers([]);
    } else {
      if (searchedMembers.length > 0) {
        const firstMatch = searchedMembers.find(m => !(settings.antinuke.whitelistedUsers || []).some(u => u.userId === m.id));
        if (firstMatch) {
          handleAddWhitelist(firstMatch.id, selectedWhitelistEvents, firstMatch);
          setMemberSearchQuery('');
          setSelectedWhitelistEvents([]);
          setSearchedMembers([]);
        }
      } else {
        alert('Please enter a valid Discord User ID (17-20 digits) or search/select a member.');
      }
    }
  };

  const getFeatureSettings = (s, tab) => {
    if (!s) return null;
    switch (tab) {
      case 'antinuke':
        return s.antinuke;
      case 'moderation':
        return s.moderation;
      case 'word-filter':
        return s.moderation?.wordFilter;
      case 'welcome':
        return s.welcome;
      case 'verification':
        return s.verification;
      case 'tickets':
        return s.tickets;
      case 'roles':
        return { autoRole: s.autoRole, autoNickname: s.autoNickname };
      case 'youtube':
        return s.youtube;
      case 'tempvoice':
        return s.tempVoice;
      default:
        return null;
    }
  };

  const isSettingsEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) {
      return a == b;
    }
    if (typeof a !== 'object' || typeof b !== 'object') {
      if (typeof a === 'number' || typeof b === 'number') {
        return Number(a) === Number(b);
      }
      if (typeof a === 'boolean' || typeof b === 'boolean') {
        return Boolean(a) === Boolean(b);
      }
      return a === b;
    }

    if (Array.isArray(a) !== Array.isArray(b)) return false;
    if (Array.isArray(a)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!isSettingsEqual(a[i], b[i])) return false;
      }
      return true;
    }

    const keysA = Object.keys(a).filter(k => k !== '_id' && k !== '__v' && a[k] !== undefined && a[k] !== null);
    const keysB = Object.keys(b).filter(k => k !== '_id' && k !== '__v' && b[k] !== undefined && b[k] !== null);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!isSettingsEqual(a[key], b[key])) return false;
    }
    return true;
  };

  const hasUnsavedChanges = (tab = activeTab) => {
    if (tab === 'server-control') {
      return adminHasUnsavedChanges;
    }
    if (!settings || !savedSettings) return false;
    const current = getFeatureSettings(settings, tab);
    const saved = getFeatureSettings(savedSettings, tab);
    if (!current || !saved) return false;
    return !isSettingsEqual(current, saved);
  };

  const handleTabClick = (newTab) => {
    if (hasUnsavedChanges()) {
      alert("You have unsaved changes. Please save or reset before leaving this feature.");
      return;
    }
    setActiveTab(newTab);
    if (newTab === 'webhook-announcement') {
      fetchWebhookTemplates();
    }
  };

  const handleBackClick = () => {
    if (hasUnsavedChanges()) {
      alert("You have unsaved changes. Please save or reset before leaving this feature.");
      return;
    }
    onBack();
  };

  const handleReset = () => {
    if (savedSettings) {
      setSettings(JSON.parse(JSON.stringify(savedSettings)));
      showNotification('Changes reset to previously saved values.');
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Please save or reset before leaving this feature.";
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [settings, savedSettings, activeTab, adminHasUnsavedChanges]);

  const resolveUploadUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/uploads/')) {
      const isLocal = window.location.port === '5173' || window.location.port === '5174';
      return isLocal ? `http://localhost:2010${url}` : url;
    }
    return url;
  };

  const formatWelcomeText = (rawText) => {
    if (!rawText) return '';
    
    const redirectCh = channels.find(c => c.id === settings?.welcome?.redirectChannelId);
    const channelName = redirectCh ? redirectCh.name : 'channel';
    const redirectCh2 = channels.find(c => c.id === settings?.welcome?.redirectChannelId2);
    const channelName2 = redirectCh2 ? redirectCh2.name : 'channel';
    const redirectCh3 = channels.find(c => c.id === settings?.welcome?.redirectChannelId3);
    const channelName3 = redirectCh3 ? redirectCh3.name : 'channel';

    let text = rawText
      .replace(/{username}/g, user?.username || 'Member')
      .replace(/{server}/g, guildName || 'Server');

    const parts = text.split(/({user}|{channel}|{channel2}|{channel3})/g);
    
    return parts.map((part, index) => {
      if (part === '{user}') {
        return (
          <span key={`mention-user-${index}`} className="discord-mention">
            @{user?.username || 'Member'}
          </span>
        );
      }
      if (part === '{channel}') {
        return (
          <span key={`mention-ch-${index}`} className="discord-mention-channel">
            #{channelName}
          </span>
        );
      }
      if (part === '{channel2}') {
        return (
          <span key={`mention-ch2-${index}`} className="discord-mention-channel">
            #{channelName2}
          </span>
        );
      }
      if (part === '{channel3}') {
        return (
          <span key={`mention-ch3-${index}`} className="discord-mention-channel">
            #{channelName3}
          </span>
        );
      }
      
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return boldParts.map((subPart, subIndex) => {
        if (subPart.startsWith('**') && subPart.endsWith('**')) {
          return (
            <strong key={`bold-${index}-${subIndex}`} style={{ color: '#ffffff', fontWeight: '600' }}>
              {subPart.slice(2, -2)}
            </strong>
          );
        }
        return subPart;
      });
    });
  };

  const renderRedirectButton = () => {
    const redirectIds = [
      settings?.welcome?.redirectChannelId,
      settings?.welcome?.redirectChannelId2,
      settings?.welcome?.redirectChannelId3
    ].filter(Boolean);

    if (redirectIds.length === 0) return null;

    return (
      <div className="discord-buttons-row">
        {redirectIds.map((id, index) => {
          const redirectCh = channels.find(c => c.id === id);
          const channelName = redirectCh ? redirectCh.name : 'channel';
          return (
            <span key={id + index} className="discord-button-link">
              <span>#{channelName}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </span>
          );
        })}
      </div>
    );
  };

  const renderCanvasCard = () => {
    if (!settings || !settings.welcome) return null;
    return (
      <div className="glass-panel" style={{
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        containerType: 'inline-size',
        background: settings.welcome.background ? (
          (settings.welcome.background.startsWith('#') || settings.welcome.background.length === 6 || settings.welcome.background.length === 3) 
          ? (settings.welcome.background.startsWith('#') ? settings.welcome.background : `#${settings.welcome.background}`)
          : `url(${resolveUploadUrl(settings.welcome.background)}) center/cover no-repeat`
        ) : 'linear-gradient(135deg, #0F0C20 0%, #151030 50%, #060410 100%)',
        border: (settings.welcome.cardBorderEnabled && settings.welcome.cardBorderThickness > 0)
          ? `${(settings.welcome.cardBorderThickness || 8) / 8}cqw solid ${settings.welcome.cardBorderColor || '#00ff66'}`
          : '1px solid rgba(255,255,255,0.05)',
        userSelect: 'none',
        boxSizing: 'border-box'
      }}>
        {/* Overlay Tint layer */}
        {((settings.welcome.overlayOpacity !== undefined ? settings.welcome.overlayOpacity : 0.3) > 0) && (
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            backgroundColor: settings.welcome.overlayColor || '#000000', 
            opacity: settings.welcome.overlayOpacity !== undefined ? settings.welcome.overlayOpacity : 0.3,
            zIndex: 1, 
            pointerEvents: 'none' 
          }} />
        )}

        {/* Drag items container query representation */}
        {/* Avatar element wrapper */}
        {settings.welcome.avatarEnabled !== false && (
          <div 
            onMouseDown={(e) => handleDragStart(e, 'avatar')}
            onTouchStart={(e) => handleDragStart(e, 'avatar')}
            style={{
              position: 'absolute',
              left: `${((settings.welcome.avatarX !== undefined ? settings.welcome.avatarX : 400) / 800) * 100}%`,
              top: `${((settings.welcome.avatarY !== undefined ? settings.welcome.avatarY : 130) / 450) * 100}%`,
              width: `${((settings.welcome.avatarSize || 140) / 800) * 100}%`,
              aspectRatio: '1/1',
              transform: `translate(-50%, -50%) rotate(${settings.welcome.avatarRotation || 0}deg)`,
              cursor: 'move',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
              alt="avatar preview"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: `${(settings.welcome.avatarBorderThickness !== undefined ? settings.welcome.avatarBorderThickness : 6) / 8}cqw solid ${settings.welcome.avatarBorderColor || settings.welcome.textColor || '#ffffff'}`,
                boxShadow: settings.welcome.avatarShadowEnabled 
                  ? `0 0 ${(settings.welcome.avatarShadowBlur || 15) / 8}cqw ${settings.welcome.avatarShadowColor || '#00ff66'}` 
                  : '0 4px 10px rgba(0,0,0,0.4)',
                pointerEvents: 'none'
              }}
            />
          </div>
        )}
        
        {/* Title element wrapper */}
        {settings.welcome.titleEnabled !== false && (
          <div 
            onMouseDown={(e) => handleDragStart(e, 'title')}
            onTouchStart={(e) => handleDragStart(e, 'title')}
            style={{
              position: 'absolute',
              left: `${((settings.welcome.titleX !== undefined ? settings.welcome.titleX : 400) / 800) * 100}%`,
              top: `${((settings.welcome.titleY !== undefined ? settings.welcome.titleY : 260) / 450) * 100}%`,
              transform: settings.welcome.textAlignment === 'left' ? 'translate(-100%, -50%)' : (settings.welcome.textAlignment === 'right' ? 'translate(0%, -50%)' : 'translate(-50%, -50%)'),
              cursor: 'move',
              zIndex: 9,
              textAlign: settings.welcome.textAlignment === 'left' ? 'right' : (settings.welcome.textAlignment === 'right' ? 'left' : 'center'),
              whiteSpace: 'nowrap'
            }}
          >
            <h2 style={{
              fontSize: `${(settings.welcome.titleSize || 54) / 8}cqw`,
              color: settings.welcome.textColor || '#ffffff',
              fontFamily: settings.welcome.titleFontFamily || settings.welcome.fontFamily || 'Ethnocentric, sans-serif',
              fontWeight: settings.welcome.fontWeight || 'bold',
              fontStyle: settings.welcome.titleFontStyle || 'normal',
              letterSpacing: '2px',
              textShadow: settings.welcome.titleGlowEnabled 
                ? `0 0 ${(settings.welcome.titleGlowBlur || 10) / 8}cqw ${settings.welcome.titleGlowColor || '#00ff66'}, 0 0 ${(settings.welcome.titleGlowBlur || 10) / 4}cqw ${settings.welcome.titleGlowColor || '#00ff66'}`
                : (settings.welcome.textShadowEnabled 
                  ? `0 1px ${(settings.welcome.textShadowBlur || 5) / 8}cqw ${settings.welcome.textShadowColor || '#000000'}` 
                  : '0 2px 6px rgba(0,0,0,0.6)'),
              margin: 0,
              pointerEvents: 'none'
            }}>
              {(settings.welcome.titleText || 'WELCOME').replace(/{server}/g, guildName).replace(/{username}/g, (user.username || 'Member').toUpperCase())}
            </h2>
          </div>
        )}
        
        {/* Username element wrapper */}
        {settings.welcome.usernameEnabled !== false && (
          <div 
            onMouseDown={(e) => handleDragStart(e, 'username')}
            onTouchStart={(e) => handleDragStart(e, 'username')}
            style={{
              position: 'absolute',
              left: `${((settings.welcome.usernameX !== undefined ? settings.welcome.usernameX : 400) / 800) * 100}%`,
              top: `${((settings.welcome.usernameY !== undefined ? settings.welcome.usernameY : 320) / 450) * 100}%`,
              transform: settings.welcome.textAlignment === 'left' ? 'translate(-100%, -50%)' : (settings.welcome.textAlignment === 'right' ? 'translate(0%, -50%)' : 'translate(-50%, -50%)'),
              cursor: 'move',
              zIndex: 9,
              textAlign: settings.welcome.textAlignment === 'left' ? 'right' : (settings.welcome.textAlignment === 'right' ? 'left' : 'center'),
              whiteSpace: 'nowrap'
            }}
          >
            <h3 style={{
              fontSize: `${(settings.welcome.usernameSize || 38) / 8}cqw`,
              color: settings.welcome.usernameColor || '#ffffff',
              fontFamily: settings.welcome.usernameFontFamily || settings.welcome.fontFamily || 'Ethnocentric, sans-serif',
              fontWeight: settings.welcome.fontWeight || 'bold',
              fontStyle: settings.welcome.usernameFontStyle || 'normal',
              textShadow: settings.welcome.usernameGlowEnabled 
                ? `0 0 ${(settings.welcome.usernameGlowBlur || 10) / 8}cqw ${settings.welcome.usernameGlowColor || '#00ff66'}, 0 0 ${(settings.welcome.usernameGlowBlur || 10) / 4}cqw ${settings.welcome.usernameGlowColor || '#00ff66'}`
                : (settings.welcome.textShadowEnabled 
                  ? `0 1px ${(settings.welcome.textShadowBlur || 5) / 8}cqw ${settings.welcome.textShadowColor || '#000000'}` 
                  : '0 2px 6px rgba(0,0,0,0.6)'),
              margin: 0,
              pointerEvents: 'none'
            }}>
              {'@' + user.username.toUpperCase()}
            </h3>
          </div>
        )}
        
        {/* Subtext element wrapper */}
        {settings.welcome.subtextEnabled !== false && (
          <div 
            onMouseDown={(e) => handleDragStart(e, 'subtext')}
            onTouchStart={(e) => handleDragStart(e, 'subtext')}
            style={{
              position: 'absolute',
              left: `${((settings.welcome.subtextX !== undefined ? settings.welcome.subtextX : 400) / 800) * 100}%`,
              top: `${((settings.welcome.subtextY !== undefined ? settings.welcome.subtextY : 370) / 450) * 100}%`,
              transform: settings.welcome.textAlignment === 'left' ? 'translate(-100%, -50%)' : (settings.welcome.textAlignment === 'right' ? 'translate(0%, -50%)' : 'translate(-50%, -50%)'),
              cursor: 'move',
              zIndex: 9,
              textAlign: settings.welcome.textAlignment === 'left' ? 'right' : (settings.welcome.textAlignment === 'right' ? 'left' : 'center'),
              whiteSpace: 'nowrap'
            }}
          >
            <p style={{
              fontSize: `${(settings.welcome.subtextSize || 22) / 8}cqw`,
              color: settings.welcome.subtextColor || 'rgba(255,255,255,0.8)',
              fontFamily: settings.welcome.subtextFontFamily || settings.welcome.fontFamily || 'Ethnocentric, sans-serif',
              fontWeight: settings.welcome.fontWeight || 'bold',
              fontStyle: settings.welcome.subtextFontStyle || 'normal',
              textShadow: settings.welcome.subtextGlowEnabled 
                ? `0 0 ${(settings.welcome.subtextGlowBlur || 10) / 8}cqw ${settings.welcome.subtextGlowColor || '#00ff66'}, 0 0 ${(settings.welcome.subtextGlowBlur || 10) / 4}cqw ${settings.welcome.subtextGlowColor || '#00ff66'}`
                : (settings.welcome.textShadowEnabled 
                  ? `0 1px ${(settings.welcome.textShadowBlur || 5) / 8}cqw ${settings.welcome.textShadowColor || '#000000'}` 
                  : '0 1px 4px rgba(0,0,0,0.6)'),
              margin: 0,
              pointerEvents: 'none'
            }}>
              {(settings.welcome.subtextText || 'TO {server}').replace(/{server}/g, guildName).replace(/{username}/g, (user.username || 'Member').toUpperCase())}
            </p>
          </div>
        )}
      </div>
    );
  };

  const handleResetLayout = () => {
    setSettings(prev => ({
      ...prev,
      welcome: {
        ...prev.welcome,
        avatarSize: 140,
        avatarX: 400,
        avatarY: 130,
        avatarRotation: 0,
        avatarBorderThickness: 6,
        avatarBorderColor: '#00ff66',
        usernameX: 400,
        usernameY: 320,
        usernameSize: 38,
        titleX: 400,
        titleY: 260,
        titleSize: 54,
        subtextX: 400,
        subtextY: 370,
        subtextSize: 22,
        textAlignment: 'center',
        fontWeight: 'bold',
        avatarEnabled: true,
        titleEnabled: true,
        usernameEnabled: true,
        subtextEnabled: true,
        layoutType: 'classic',
        titleText: 'WELCOME',
        subtextText: 'TO {server}',
        textColor: '#ffffff',
        usernameColor: '#ffffff',
        subtextColor: '#00ff66',
        fontFamily: 'Ethnocentric',
        titleFontFamily: 'Ethnocentric',
        usernameFontFamily: 'Ethnocentric',
        subtextFontFamily: 'Ethnocentric',
        textShadowEnabled: false,
        textShadowColor: '#000000',
        textShadowBlur: 5,
        titleGlowEnabled: false,
        titleGlowColor: '#00ff66',
        titleGlowBlur: 15,
        usernameGlowEnabled: false,
        usernameGlowColor: '#00ff66',
        usernameGlowBlur: 15,
        subtextGlowEnabled: false,
        subtextGlowColor: '#00ff66',
        subtextGlowBlur: 15,
        avatarShadowEnabled: false,
        avatarShadowColor: '#00ff66',
        avatarShadowBlur: 15,
        overlayOpacity: 0.3,
        overlayColor: '#000000',
        cardBorderEnabled: false,
        cardBorderColor: '#2563eb',
        cardBorderThickness: 8
      }
    }));
    showNotification('Layout reset to default positions, sizes & visibility!');
  };

  const getSanitizedSettings = (rawSettings) => {
    const s = JSON.parse(JSON.stringify(rawSettings));
    if (s.moderation) {
      if (s.moderation.photoSpam) {
        const ps = s.moderation.photoSpam;
        if (ps.maxPhotos === '' || ps.maxPhotos === null || ps.maxPhotos === undefined || isNaN(ps.maxPhotos)) {
          ps.maxPhotos = 3;
        }
        if (ps.timeWindow === '' || ps.timeWindow === null || ps.timeWindow === undefined || isNaN(ps.timeWindow)) {
          ps.timeWindow = 10000;
        }
        if (ps.timeoutDuration === '' || ps.timeoutDuration === null || ps.timeoutDuration === undefined || isNaN(ps.timeoutDuration)) {
          ps.timeoutDuration = 10;
        }
      }
      if (s.moderation.spam) {
        const spam = s.moderation.spam;
        if (spam.maxMessages === '' || spam.maxMessages === null || spam.maxMessages === undefined || isNaN(spam.maxMessages)) {
          spam.maxMessages = 5;
        }
        if (spam.timeWindow === '' || spam.timeWindow === null || spam.timeWindow === undefined || isNaN(spam.timeWindow)) {
          spam.timeWindow = 5000;
        }
        if (spam.timeoutDuration === '' || spam.timeoutDuration === null || spam.timeoutDuration === undefined || isNaN(spam.timeoutDuration)) {
          spam.timeoutDuration = 5;
        }
      }
      if (s.moderation.wordFilter) {
        const wf = s.moderation.wordFilter;
        if (wf.maxViolations === '' || wf.maxViolations === null || wf.maxViolations === undefined || isNaN(wf.maxViolations)) {
          wf.maxViolations = 3;
        }
        if (wf.violationWindow === '' || wf.violationWindow === null || wf.violationWindow === undefined || isNaN(wf.violationWindow)) {
          wf.violationWindow = 300000;
        }
        if (wf.timeoutDuration === '' || wf.timeoutDuration === null || wf.timeoutDuration === undefined || isNaN(wf.timeoutDuration)) {
          wf.timeoutDuration = 10;
        }
      }
    }
    if (s.antinuke) {
      const an = s.antinuke;
      if (an.threshold === '' || an.threshold === null || an.threshold === undefined || isNaN(an.threshold)) {
        an.threshold = 3;
      } else {
        an.threshold = parseInt(an.threshold);
      }
      if (an.timeframe === '' || an.timeframe === null || an.timeframe === undefined || isNaN(an.timeframe)) {
        an.timeframe = 60;
      } else {
        an.timeframe = parseInt(an.timeframe);
      }
    }

    return s;
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const sanitized = getSanitizedSettings(settings);
      const updated = await api.saveSettings(guildId, sanitized);
      setSettings(updated);
      setSavedSettings(JSON.parse(JSON.stringify(updated)));
      showNotification('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to save settings. Please verify details.');
    } finally {
      setSaving(false);
    }
  };

  const handleFormKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.ctrlKey) {
        handleSave(e);
      } else {
        if (e.target.tagName.toLowerCase() !== 'textarea') {
          e.preventDefault();
        }
      }
    }
  };

  const handlePublishVerification = async () => {
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      // First save settings
      const sanitized = getSanitizedSettings(settings);
      const updated = await api.saveSettings(guildId, sanitized);
      setSettings(updated);
      setSavedSettings(JSON.parse(JSON.stringify(updated)));
      // Publish
      const res = await api.publishVerification(guildId);
      showNotification(res.message || 'Verification message published!');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to publish verification message.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishTickets = async () => {
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      // First save settings
      const sanitized = getSanitizedSettings(settings);
      const updated = await api.saveSettings(guildId, sanitized);
      setSettings(updated);
      setSavedSettings(JSON.parse(JSON.stringify(updated)));
      // Publish
      const res = await api.publishTickets(guildId);
      showNotification(res.message || 'Ticket system message published!');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to publish ticket system message.');
    } finally {
      setSaving(false);
    }
  };

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(99, 102, 241, 0.2)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }} />
          <p style={{ color: 'var(--text-secondary)' }}>Syncing settings database...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', maxWidth: '500px', borderColor: 'var(--danger)' }}>
          <AlertTriangle size={48} style={{ color: 'var(--danger)', marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Failed to Load Settings</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Could not retrieve settings for this server. Please check if the bot is online and running.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={onBack} className="btn-secondary">Back to Servers</button>
            <button onClick={() => window.location.reload()} className="btn-primary">Retry</button>
          </div>
        </div>
      </div>
    );
  }
  const getAvatarUrl = () => {
    if (!user) return 'https://cdn.discordapp.com/embed/avatars/0.png';
    if (user.avatar) {
      const id = user.discordId || user.id;
      return `https://cdn.discordapp.com/avatars/${id}/${user.avatar}.png`;
    }
    return 'https://cdn.discordapp.com/embed/avatars/0.png';
  };

  return (
    <div className="dashboard-root-layout">
      {/* Top Navbar Header */}
      <header className="dashboard-top-navbar">
        <div className="dashboard-nav-left">
          <button onClick={handleBackClick} className="btn-nav-servers">
            <Home size={15} />
            Servers
          </button>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#fff', marginLeft: '8px' }}>
            {guildName.toUpperCase()}
          </h3>
        </div>
        
        <div className="dashboard-nav-right">
          <img 
            src={getAvatarUrl()} 
            alt={user?.username || 'User'} 
            className="dashboard-user-avatar" 
          />
          {onLogout && (
            <button onClick={onLogout} className="btn-nav-logout" title="Logout">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="dashboard-main-viewport">
        {/* Left Sidebar */}
        <aside className="dashboard-left-sidebar">
          <div className="sidebar-category-title">Configuration Panel</div>
          <div className="sidebar-menu-links">
            <button 
              type="button"
              onClick={() => handleTabClick('overview')} 
              className={`sidebar-menu-item ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <Home size={16} />
              Overview
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('moderation')} 
              className={`sidebar-menu-item ${activeTab === 'moderation' ? 'active' : ''}`}
            >
              <Shield size={16} />
              Moderation
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('word-filter')} 
              className={`sidebar-menu-item ${activeTab === 'word-filter' ? 'active' : ''}`}
            >
              <Filter size={16} />
              Word Filter
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('antinuke')} 
              className={`sidebar-menu-item ${activeTab === 'antinuke' ? 'active' : ''}`}
            >
              <ShieldAlert size={16} />
              Anti-nuke Shield
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('welcome')} 
              className={`sidebar-menu-item ${activeTab === 'welcome' ? 'active' : ''}`}
            >
              <Sparkles size={16} />
              Welcome
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('verification')} 
              className={`sidebar-menu-item ${activeTab === 'verification' ? 'active' : ''}`}
            >
              <UserCheck size={16} />
              Verification Role
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('tickets')} 
              className={`sidebar-menu-item ${activeTab === 'tickets' ? 'active' : ''}`}
            >
              <Ticket size={16} />
              Ticket Panels
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('logs')} 
              className={`sidebar-menu-item ${activeTab === 'logs' ? 'active' : ''}`}
            >
              <FileText size={16} />
              Server Logs
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('broadcast')} 
              className={`sidebar-menu-item ${activeTab === 'broadcast' ? 'active' : ''}`}
            >
              <Send size={16} />
              Broadcast DMs
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('publish')} 
              className={`sidebar-menu-item ${activeTab === 'publish' ? 'active' : ''}`}
            >
              <Megaphone size={16} />
              Publish Embeds
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('webhook-announcement')} 
              className={`sidebar-menu-item ${activeTab === 'webhook-announcement' ? 'active' : ''}`}
            >
              <Webhook size={16} />
              Webhook Announcement
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('youtube')} 
              className={`sidebar-menu-item ${activeTab === 'youtube' ? 'active' : ''}`}
            >
              <Youtube size={16} />
              YouTube Feeds
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('tempvoice')} 
              className={`sidebar-menu-item ${activeTab === 'tempvoice' ? 'active' : ''}`}
            >
              <Mic size={16} />
              Temp Voice
            </button>

            <button 
              type="button"
              onClick={() => handleTabClick('polls')} 
              className={`sidebar-menu-item ${activeTab === 'polls' ? 'active' : ''}`}
            >
              <BarChart2 size={16} />
              Premium Polls
            </button>

            {user && user.isAdmin && (
              <>
                <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '8px 0' }} />
                <button 
                  type="button"
                  onClick={() => handleTabClick('server-control')} 
                  className={`sidebar-menu-item ${activeTab === 'server-control' ? 'active' : ''}`}
                  style={{ color: 'var(--primary)', fontWeight: 'bold' }}
                >
                  <Server size={16} />
                  Server Control
                </button>
              </>
            )}
          </div>
        </aside>

        {/* Right Content Panel */}
        <main className="dashboard-right-content">
          {/* Global Notifications */}
          {successMsg && (
            <div className="glass-panel" style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: 'rgba(16, 185, 129, 0.9)',
              borderColor: 'var(--success)',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 100,
              fontFamily: 'Outfit',
              fontWeight: '600'
            }}>
              <CheckCircle size={18} />
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="glass-panel" style={{
              backgroundColor: 'rgba(244, 63, 94, 0.1)',
              borderColor: 'var(--danger)',
              color: 'var(--danger)',
              padding: '14px 20px',
              borderRadius: '10px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertTriangle size={18} />
              {errorMsg}
            </div>
          )}

          {activeTab === 'server-control' && user && user.isAdmin ? (
            <AdminServerSettings 
              guildId={guildId} 
              onHasUnsavedChangesChange={setAdminHasUnsavedChanges}
            />
          ) : (
            <form onSubmit={handleSave} onKeyDown={handleFormKeyDown}>
            
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div>

                  <div className="overview-stats-container">
                    <div className="overview-stat-panel">
                      <span className="overview-stat-label">Members</span>
                      <h3 className="overview-stat-number">{memberCount || 66}</h3>
                    </div>
                    <div className="overview-stat-panel">
                      <span className="overview-stat-label">Text Channels</span>
                      <h3 className="overview-stat-number">{channels.length || 54}</h3>
                    </div>
                    <div className="overview-stat-panel">
                      <span className="overview-stat-label">Voice Channels</span>
                      <h3 className="overview-stat-number">{voiceChannels.length || 4}</h3>
                    </div>
                  </div>

                  <div className="checklist-card-box">
                    <h3 className="checklist-title-h3">Active Modules Checklist</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { label: 'Auto-Moderation', enabled: settings?.moderation?.spam?.enabled },
                        { label: 'Welcome Embeds & Roles', enabled: settings?.welcome?.enabled },
                        { label: 'Security Verification Button', enabled: settings?.verification?.enabled },
                        { label: 'Support Tickets System', enabled: settings?.tickets?.enabled },
                        { label: 'Temporary Voice Channels', enabled: settings?.tempVoice?.enabled },
                        { label: 'Server Action Auditing Logs', enabled: true },
                        { label: 'Anti-nuke Admin Shield', enabled: settings?.antinuke?.enabled }
                      ].map((module, idx) => (
                        <div key={idx} className="checklist-row-item">
                          <span className="checklist-row-label">{module.label}</span>
                          <span className={`badge-status-pill ${module.enabled ? 'enabled' : 'disabled'}`}>
                            {module.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MODERATION */}
              {activeTab === 'moderation' && (
                <div>

                  {/* Section 1: Spam Protection */}
                  <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Spam Message Blocker</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Deletes spam messages and automatically applies timeouts to spamming users.</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.moderation.spam.enabled} 
                          onChange={() => handleToggle('moderation.spam.enabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {settings.moderation.spam.enabled && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Spam Threshold (messages)</label>
                            <input 
                              type="number" 
                              min="2" 
                              max="30"
                              value={settings.moderation.spam.maxMessages ?? 5}
                              onChange={(e) => {
                                const val = e.target.value;
                                handleInputChange('moderation.spam.maxMessages', val === '' ? '' : parseInt(val));
                              }}
                              className="glass-input" 
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Interval Window (seconds)</label>
                            <input 
                              type="number" 
                              min="1" 
                              max="60"
                              value={settings.moderation.spam.timeWindow === '' ? '' : (settings.moderation.spam.timeWindow !== undefined ? settings.moderation.spam.timeWindow / 1000 : 5)}
                              onChange={(e) => {
                                const val = e.target.value;
                                handleInputChange('moderation.spam.timeWindow', val === '' ? '' : parseInt(val) * 1000);
                              }}
                              className="glass-input" 
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Auto Timeout Duration (minutes)</label>
                            <input 
                              type="number" 
                              min="1" 
                              max="1440"
                              value={settings.moderation.spam.timeoutDuration ?? 5}
                              onChange={(e) => {
                                const val = e.target.value;
                                handleInputChange('moderation.spam.timeoutDuration', val === '' ? '' : parseInt(val));
                              }}
                              className="glass-input" 
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Spam Protected Channels</label>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Select channels here where spam protection will be active.</p>
                          <div style={{ maxHeight: '120px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            {channels.map(ch => (
                              <label key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', cursor: 'pointer', fontSize: '0.9rem' }}>
                                <input 
                                  type="checkbox"
                                  checked={(settings.moderation.spam.protectedChannels || []).includes(ch.id)}
                                  onChange={(e) => {
                                    const current = [...(settings.moderation.spam.protectedChannels || [])];
                                    if (e.target.checked) {
                                      current.push(ch.id);
                                    } else {
                                      const index = current.indexOf(ch.id);
                                      if (index > -1) current.splice(index, 1);
                                    }
                                    handleInputChange('moderation.spam.protectedChannels', current);
                                  }}
                                />
                                #{ch.name}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 2: Link Protection */}
                  <div className="glass-panel" style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Link Protection & Filters</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Instantly blocks and deletes links posted in guarded text channels.</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.moderation.links.enabled} 
                          onChange={() => handleToggle('moderation.links.enabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {settings.moderation.links.enabled && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Allowed Link Whitelist (one domain per line, e.g. youtube.com)</label>
                          <textarea
                            rows="3"
                            placeholder="youtube.com&#10;discord.gg"
                            value={settings.moderation.links.allowedLinks.join('\n')}
                            onChange={(e) => handleInputChange('moderation.links.allowedLinks', e.target.value.split('\n').filter(Boolean))}
                            className="glass-input"
                            style={{ fontFamily: 'monospace' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Link Protected Channels</label>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Select channels here where link protection will be active.</p>
                          <div style={{ maxHeight: '120px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            {channels.map(ch => (
                              <label key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', cursor: 'pointer', fontSize: '0.9rem' }}>
                                <input 
                                  type="checkbox"
                                  checked={(settings.moderation.links.protectedChannels || []).includes(ch.id)}
                                  onChange={(e) => {
                                    const current = [...(settings.moderation.links.protectedChannels || [])];
                                    if (e.target.checked) {
                                      current.push(ch.id);
                                    } else {
                                      const index = current.indexOf(ch.id);
                                      if (index > -1) current.splice(index, 1);
                                    }
                                    handleInputChange('moderation.links.protectedChannels', current);
                                  }}
                                />
                                #{ch.name}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 3: Photo Spam Protection */}
                  <div className="glass-panel" style={{ padding: '24px', marginTop: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Photo Spam Protection</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Detects users spamming photos/images across any channel in the server, deletes the messages, and issues a timeout.</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.moderation?.photoSpam?.enabled || false} 
                          onChange={() => handleToggle('moderation.photoSpam.enabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {(settings.moderation?.photoSpam?.enabled) && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Photo Threshold (images)</label>
                            <input 
                              type="number" 
                              min="1" 
                              max="30"
                              value={settings.moderation?.photoSpam?.maxPhotos ?? 3}
                              onChange={(e) => {
                                const val = e.target.value;
                                handleInputChange('moderation.photoSpam.maxPhotos', val === '' ? '' : parseInt(val));
                              }}
                              className="glass-input" 
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Interval Window (seconds)</label>
                            <input 
                              type="number" 
                              min="1" 
                              max="120"
                              value={settings.moderation?.photoSpam?.timeWindow === '' ? '' : (settings.moderation?.photoSpam?.timeWindow !== undefined ? settings.moderation.photoSpam.timeWindow / 1000 : 10)}
                              onChange={(e) => {
                                const val = e.target.value;
                                handleInputChange('moderation.photoSpam.timeWindow', val === '' ? '' : parseInt(val) * 1000);
                              }}
                              className="glass-input" 
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Auto Timeout Duration (minutes)</label>
                            <input 
                              type="number" 
                              min="1" 
                              max="1440"
                              value={settings.moderation?.photoSpam?.timeoutDuration ?? 10}
                              onChange={(e) => {
                                const val = e.target.value;
                                handleInputChange('moderation.photoSpam.timeoutDuration', val === '' ? '' : parseInt(val));
                              }}
                              className="glass-input" 
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Photo Spam Whitelisted Channels</label>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Select channels here where users are ALLOWED to spam photos (bypasses protection).</p>
                          <div style={{ maxHeight: '120px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            {channels.map(ch => (
                              <label key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', cursor: 'pointer', fontSize: '0.9rem' }}>
                                <input 
                                  type="checkbox"
                                  checked={(settings.moderation?.photoSpam?.whitelistedChannels || []).includes(ch.id)}
                                  onChange={(e) => {
                                    const current = [...(settings.moderation?.photoSpam?.whitelistedChannels || [])];
                                    if (e.target.checked) {
                                      current.push(ch.id);
                                    } else {
                                      const index = current.indexOf(ch.id);
                                      if (index > -1) current.splice(index, 1);
                                    }
                                    handleInputChange('moderation.photoSpam.whitelistedChannels', current);
                                  }}
                                />
                                #{ch.name}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 4: Moderation Bypass Whitelist */}
                  <div className="glass-panel" style={{ padding: '24px', marginTop: '24px', backgroundColor: 'rgba(255,255,255,0.01)', overflow: 'visible' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>Spam Protection Whitelist</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                      Whitelisted users bypass all spam protection modules (Photo Spam, Message Spam, Link Spam, etc.).
                    </p>

                    <div style={{ position: 'relative', zIndex: 10, marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        Search and Add Member to Whitelist
                      </label>
                      
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                          <input 
                            type="text" 
                            placeholder="Type username or member ID to search..." 
                            value={modWhitelistSearchQuery}
                            onChange={(e) => setModWhitelistSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleManualAddModWhitelist();
                              }
                            }}
                            className="glass-input" 
                            style={{ width: '100%', padding: '12px' }}
                          />
                          {modWhitelistSearchLoading && (
                            <div style={{ position: 'absolute', right: '15px', top: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Searching...</div>
                          )}
                        </div>
                        <button 
                          type="button" 
                          onClick={handleManualAddModWhitelist}
                          className="btn-primary"
                          style={{ padding: '0 24px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          Add
                        </button>
                      </div>

                      {modWhitelistSearchedMembers.length > 0 && (
                        <div 
                          style={{ 
                            position: 'absolute', 
                            left: 0, 
                            right: 0, 
                            top: '100%', 
                            background: 'rgba(25, 25, 35, 0.98)', 
                            border: '1px solid var(--border-color)', 
                            borderRadius: '8px', 
                            marginTop: '5px', 
                            maxHeight: '200px', 
                            overflowY: 'auto',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1000
                          }}
                        >
                          {modWhitelistSearchedMembers
                            .filter(m => !(settings.moderation?.whitelistedUsers || []).some(u => u.userId === m.id))
                            .map(m => (
                              <div 
                                key={m.id} 
                                onClick={() => { handleAddModWhitelist(m.id, m); setModWhitelistSearchQuery(''); }} 
                                style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '12px', 
                                  padding: '10px 14px', 
                                  cursor: 'pointer', 
                                  borderBottom: '1px solid rgba(255,255,255,0.05)' 
                                }}
                                className="search-item"
                              >
                                <img 
                                  src={m.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} 
                                />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{m.displayName}</span>
                                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@{m.username} • {m.id}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        Whitelisted Users:
                      </h4>
                      {(settings.moderation?.whitelistedUsers || []).length === 0 ? (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                          No whitelisted users. All members, including Server Owner and Administrators, will be subject to spam protection.
                        </p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {(settings.moderation.whitelistedUsers || []).map(entry => {
                            const details = getMemberDetails(entry.userId);
                            return (
                              <div 
                                key={entry.userId} 
                                style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'space-between',
                                  padding: '10px 16px', 
                                  borderRadius: '8px', 
                                  background: 'rgba(255,255,255,0.03)',
                                  border: '1px solid var(--border-color)' 
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <img 
                                    src={details.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                                  />
                                  <div>
                                    <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: '600' }}>
                                      {details.displayName} {details.username && details.username !== entry.userId && `(@${details.username})`} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>(ID: {entry.userId})</span>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                      Added by: {entry.addedBy || 'Unknown'}
                                    </div>
                                  </div>
                                </div>
                                <button 
                                  type="button" 
                                  onClick={() => handleRemoveModWhitelist(entry.userId)} 
                                  className="btn-danger"
                                  style={{ 
                                    border: 'none', 
                                    background: 'rgba(239, 68, 68, 0.1)', 
                                    color: 'var(--danger)', 
                                    cursor: 'pointer', 
                                    padding: '6px 12px', 
                                    borderRadius: '4px',
                                    fontSize: '0.8rem', 
                                    fontWeight: 'bold'
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: WORD FILTER */}
              {activeTab === 'word-filter' && settings && settings.moderation?.wordFilter && (
                <div>

                  {/* Section A: Main Toggle & Config */}
                  <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Word Protection System</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Automatically detect and delete messages containing blocked words or phrases. Repeated violations trigger auto-timeout.</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.moderation.wordFilter.enabled} 
                          onChange={() => handleToggle('moderation.wordFilter.enabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {settings.moderation.wordFilter.enabled && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                            <input 
                              type="checkbox" 
                              checked={settings.moderation.wordFilter.deleteMessage !== false} 
                              onChange={() => handleToggle('moderation.wordFilter.deleteMessage')}
                            />
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Delete Messages</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-delete messages that match blocked words</div>
                            </div>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                            <input 
                              type="checkbox" 
                              checked={settings.moderation.wordFilter.caseSensitive || false} 
                              onChange={() => handleToggle('moderation.wordFilter.caseSensitive')}
                            />
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Case Sensitive</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Match exact casing only (off = catches BUY, Buy, bUy)</div>
                            </div>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                            <input 
                              type="checkbox" 
                              checked={settings.moderation.wordFilter.detectBypass !== false} 
                              onChange={() => handleToggle('moderation.wordFilter.detectBypass')}
                            />
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Bypass Detection</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Detect bypass attempts using spaces, dots, or leetspeak (b.u.y, $ell)</div>
                            </div>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                            <input 
                              type="checkbox" 
                              checked={settings.moderation.wordFilter.warnBeforePunishment !== false} 
                              onChange={() => handleToggle('moderation.wordFilter.warnBeforePunishment')}
                            />
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Warn Before Timeout</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Send warnings before applying timeout punishment</div>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section B: Violation Settings */}
                  {settings.moderation.wordFilter.enabled && (
                    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px' }}>Violation & Punishment Settings</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Violations Before Timeout</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="50"
                            value={settings.moderation.wordFilter.maxViolations ?? 3}
                            onChange={(e) => {
                              const val = e.target.value;
                              handleInputChange('moderation.wordFilter.maxViolations', val === '' ? '' : parseInt(val));
                            }}
                            className="glass-input" 
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Violation Window (seconds)</label>
                          <input 
                            type="number" 
                            min="10" 
                            max="3600"
                            value={settings.moderation.wordFilter.violationWindow === '' ? '' : ((settings.moderation.wordFilter.violationWindow || 300000) / 1000)}
                            onChange={(e) => {
                              const val = e.target.value;
                              handleInputChange('moderation.wordFilter.violationWindow', val === '' ? '' : parseInt(val) * 1000);
                            }}
                            className="glass-input" 
                          />
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>Time window for counting violations</p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Timeout Duration (minutes)</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="10080"
                            value={settings.moderation.wordFilter.timeoutDuration ?? 10}
                            onChange={(e) => {
                              const val = e.target.value;
                              handleInputChange('moderation.wordFilter.timeoutDuration', val === '' ? '' : parseInt(val));
                            }}
                            className="glass-input" 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section C: Blocked Words Manager */}
                  {settings.moderation.wordFilter.enabled && (
                    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>Blocked Words & Phrases</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Add words, phrases, or domains that the bot should block. Use the quick-add buttons to load common presets.</p>
                      
                      {/* Quick-add presets */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        {[
                          { label: '🔗 Links & URLs', category: 'links', words: ['http://', 'https://', 'www.', 'youtube.com', 'youtu.be', 'youtube'] },
                          { label: '💬 Discord Invites', category: 'invites', words: ['discord.gg', 'discord.com', 'discordapp.com', 'discord invite', 'join my server'] },
                          { label: '🛒 Ads & Sales', category: 'ads', words: ['buy', 'sell', 'trade', 'cheap', 'discount', 'shop'] },
                          { label: '📩 DM Requests', category: 'dm', words: ['dm me', 'pm me', 'contact me'] },
                          { label: '🌐 Social Media', category: 'social', words: ['github.com', 'twitter.com', 'x.com', 'instagram.com', 'telegram', 't.me'] },
                          { label: '🚨 Scam Phrases', category: 'scam', words: ['free nitro', 'free robux', 'token', 'grabber', 'ip logger'] }
                        ].map(preset => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              const currentWords = settings.moderation.wordFilter.blockedWords || [];
                              const newWords = preset.words
                                .filter(w => !currentWords.some(cw => cw.word.toLowerCase() === w.toLowerCase()))
                                .map(w => ({ word: w, category: preset.category, isRegex: false }));
                              if (newWords.length > 0) {
                                handleInputChange('moderation.wordFilter.blockedWords', [...currentWords, ...newWords]);
                                showNotification(`Added ${newWords.length} word(s) from "${preset.label}" preset.`);
                              } else {
                                showNotification('All words from this preset are already added.');
                              }
                            }}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '8px',
                              border: '1px solid var(--border-color)',
                              background: 'rgba(255,255,255,0.03)',
                              color: 'var(--text-primary)',
                              fontSize: '0.8rem',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)'; e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>

                      {/* Add single word */}
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                        <input
                          type="text"
                          placeholder="Type a word or phrase..."
                          value={wordFilterNewWord}
                          onChange={(e) => setWordFilterNewWord(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (!wordFilterNewWord.trim()) return;
                              const currentWords = settings.moderation.wordFilter.blockedWords || [];
                              if (currentWords.some(w => w.word.toLowerCase() === wordFilterNewWord.trim().toLowerCase())) {
                                setErrorMsg('This word is already in the blocked list.');
                                return;
                              }
                              handleInputChange('moderation.wordFilter.blockedWords', [...currentWords, { word: wordFilterNewWord.trim(), category: wordFilterNewCategory, isRegex: false }]);
                              setWordFilterNewWord('');
                            }
                          }}
                          className="glass-input"
                          style={{ flex: 1 }}
                        />
                        <select
                          value={wordFilterNewCategory}
                          onChange={(e) => setWordFilterNewCategory(e.target.value)}
                          className="glass-input"
                          style={{ width: '140px' }}
                        >
                          <option value="custom">Custom</option>
                          <option value="links">Links</option>
                          <option value="invites">Invites</option>
                          <option value="ads">Ads</option>
                          <option value="dm">DM Requests</option>
                          <option value="social">Social</option>
                          <option value="scam">Scam</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            if (!wordFilterNewWord.trim()) return;
                            const currentWords = settings.moderation.wordFilter.blockedWords || [];
                            if (currentWords.some(w => w.word.toLowerCase() === wordFilterNewWord.trim().toLowerCase())) {
                              setErrorMsg('This word is already in the blocked list.');
                              return;
                            }
                            handleInputChange('moderation.wordFilter.blockedWords', [...currentWords, { word: wordFilterNewWord.trim(), category: wordFilterNewCategory, isRegex: false }]);
                            setWordFilterNewWord('');
                          }}
                          className="btn-primary"
                          style={{ padding: '0 20px', height: '46px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Plus size={16} /> Add
                        </button>
                      </div>

                      {/* Bulk import toggle */}
                      <div style={{ marginBottom: '16px' }}>
                        <button
                          type="button"
                          onClick={() => setShowWordFilterBulk(!showWordFilterBulk)}
                          style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.85rem', cursor: 'pointer', padding: '0', textDecoration: 'underline' }}
                        >
                          {showWordFilterBulk ? 'Hide Bulk Import' : '📋 Bulk Import (paste multiple words)'}
                        </button>
                        {showWordFilterBulk && (
                          <div style={{ marginTop: '10px' }}>
                            <textarea
                              rows="4"
                              placeholder="Paste one word or phrase per line..."
                              value={wordFilterBulkInput}
                              onChange={(e) => setWordFilterBulkInput(e.target.value)}
                              className="glass-input"
                              style={{ fontFamily: 'monospace', width: '100%' }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const lines = wordFilterBulkInput.split('\n').map(l => l.trim()).filter(Boolean);
                                if (lines.length === 0) return;
                                const currentWords = settings.moderation.wordFilter.blockedWords || [];
                                const newWords = lines
                                  .filter(w => !currentWords.some(cw => cw.word.toLowerCase() === w.toLowerCase()))
                                  .map(w => ({ word: w, category: wordFilterNewCategory, isRegex: false }));
                                if (newWords.length > 0) {
                                  handleInputChange('moderation.wordFilter.blockedWords', [...currentWords, ...newWords]);
                                  showNotification(`Added ${newWords.length} new word(s) via bulk import.`);
                                }
                                setWordFilterBulkInput('');
                                setShowWordFilterBulk(false);
                              }}
                              className="btn-primary"
                              style={{ marginTop: '8px', padding: '8px 20px' }}
                            >
                              Import Words
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Blocked words list */}
                      <div style={{ maxHeight: '350px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        {(settings.moderation.wordFilter.blockedWords || []).length === 0 ? (
                          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🛡️</div>
                            <p style={{ margin: 0 }}>No blocked words yet. Add words above or use the quick-add presets.</p>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {(settings.moderation.wordFilter.blockedWords || []).map((entry, idx) => (
                              <div key={idx} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                padding: '10px 16px',
                                borderBottom: idx < settings.moderation.wordFilter.blockedWords.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <code style={{ fontSize: '0.85rem', color: '#f1f5f9', background: 'rgba(99,102,241,0.1)', padding: '3px 8px', borderRadius: '4px' }}>{entry.word}</code>
                                  <span style={{ 
                                    fontSize: '0.65rem', 
                                    fontWeight: '700', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.05em',
                                    padding: '2px 8px', 
                                    borderRadius: '999px', 
                                    background: entry.category === 'scam' ? 'rgba(239,68,68,0.15)' : entry.category === 'links' ? 'rgba(59,130,246,0.15)' : entry.category === 'invites' ? 'rgba(139,92,246,0.15)' : entry.category === 'ads' ? 'rgba(245,158,11,0.15)' : entry.category === 'social' ? 'rgba(6,182,212,0.15)' : entry.category === 'dm' ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.15)',
                                    color: entry.category === 'scam' ? '#f87171' : entry.category === 'links' ? '#60a5fa' : entry.category === 'invites' ? '#a78bfa' : entry.category === 'ads' ? '#fbbf24' : entry.category === 'social' ? '#22d3ee' : entry.category === 'dm' ? '#34d399' : '#94a3b8'
                                  }}>{entry.category || 'custom'}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...(settings.moderation.wordFilter.blockedWords || [])];
                                    updated.splice(idx, 1);
                                    handleInputChange('moderation.wordFilter.blockedWords', updated);
                                  }}
                                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px', display: 'flex', opacity: 0.7 }}
                                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                  onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {(settings.moderation.wordFilter.blockedWords || []).length > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {settings.moderation.wordFilter.blockedWords.length} word{settings.moderation.wordFilter.blockedWords.length !== 1 ? 's' : ''} configured
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to remove ALL blocked words?')) {
                                handleInputChange('moderation.wordFilter.blockedWords', []);
                              }
                            }}
                            style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                          >
                            Clear All
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Section D: Exemptions */}
                  {settings.moderation.wordFilter.enabled && (
                    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px' }}>Exemptions</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Exempt specific roles, channels, or users from the word filter.</p>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                        {/* Exempt Roles */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Exempt Roles</label>
                          <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            {roles.map(role => (
                              <label key={role.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', cursor: 'pointer', fontSize: '0.85rem' }}>
                                <input 
                                  type="checkbox"
                                  checked={(settings.moderation.wordFilter.exemptRoles || []).includes(role.id)}
                                  onChange={(e) => {
                                    const current = [...(settings.moderation.wordFilter.exemptRoles || [])];
                                    if (e.target.checked) {
                                      current.push(role.id);
                                    } else {
                                      const index = current.indexOf(role.id);
                                      if (index > -1) current.splice(index, 1);
                                    }
                                    handleInputChange('moderation.wordFilter.exemptRoles', current);
                                  }}
                                />
                                <span style={{ color: role.color ? `#${role.color.toString(16).padStart(6, '0')}` : 'inherit' }}>@{role.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Exempt Channels */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Exempt Channels</label>
                          <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            {channels.map(ch => (
                              <label key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', cursor: 'pointer', fontSize: '0.85rem' }}>
                                <input 
                                  type="checkbox"
                                  checked={(settings.moderation.wordFilter.exemptChannels || []).includes(ch.id)}
                                  onChange={(e) => {
                                    const current = [...(settings.moderation.wordFilter.exemptChannels || [])];
                                    if (e.target.checked) {
                                      current.push(ch.id);
                                    } else {
                                      const index = current.indexOf(ch.id);
                                      if (index > -1) current.splice(index, 1);
                                    }
                                    handleInputChange('moderation.wordFilter.exemptChannels', current);
                                  }}
                                />
                                #{ch.name}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section E: Log Channel */}
                  {settings.moderation.wordFilter.enabled && (
                    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>Log Channel</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Optionally post word filter events to a log channel in your server.</p>
                      <select
                        value={settings.moderation.wordFilter.logChannelId || ''}
                        onChange={(e) => handleInputChange('moderation.wordFilter.logChannelId', e.target.value)}
                        className="glass-input"
                        style={{ maxWidth: '400px' }}
                      >
                        <option value="">None (disabled)</option>
                        {channels.map(ch => (
                          <option key={ch.id} value={ch.id}>#{ch.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Section F: Word Filter Logs */}
                  {settings.moderation.wordFilter.enabled && (
                    <div className="glass-panel" style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Recent Filter Activity</h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last 100 word filter events (auto-expires after 30 days)</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setWordFilterLogsLoading(true);
                            api.getWordFilterLogs(guildId).then(data => {
                              setWordFilterLogs(data || []);
                            }).catch(err => {
                              console.error('Failed to refresh word filter logs:', err.message);
                            }).finally(() => setWordFilterLogsLoading(false));
                          }}
                          className="btn-secondary"
                          style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <RotateCw size={14} /> Refresh
                        </button>
                      </div>

                      {wordFilterLogsLoading ? (
                        <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>Loading logs...</div>
                      ) : wordFilterLogs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📋</div>
                          <p style={{ margin: 0 }}>No word filter events recorded yet.</p>
                        </div>
                      ) : (
                        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                            <thead>
                              <tr style={{ background: 'rgba(0,0,0,0.3)', position: 'sticky', top: 0 }}>
                                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Time</th>
                                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>User</th>
                                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Channel</th>
                                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Matched</th>
                                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Action</th>
                                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Message</th>
                              </tr>
                            </thead>
                            <tbody>
                              {wordFilterLogs.map((log, idx) => (
                                <tr key={log._id || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                  <td style={{ padding: '8px 12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                    {new Date(log.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                  </td>
                                  <td style={{ padding: '8px 12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      {log.avatar && <img src={log.avatar} style={{ width: '20px', height: '20px', borderRadius: '50%' }} alt="" />}
                                      <span style={{ color: '#f1f5f9', fontWeight: '500' }}>{log.username || log.userId}</span>
                                    </div>
                                  </td>
                                  <td style={{ padding: '8px 12px', color: 'var(--text-muted)' }}>#{log.channelName || 'unknown'}</td>
                                  <td style={{ padding: '8px 12px' }}>
                                    <code style={{ fontSize: '0.78rem', background: 'rgba(99,102,241,0.1)', padding: '2px 6px', borderRadius: '4px', color: '#a5b4fc' }}>{log.matchedWord}</code>
                                  </td>
                                  <td style={{ padding: '8px 12px' }}>
                                    <span style={{
                                      fontSize: '0.7rem',
                                      fontWeight: '700',
                                      textTransform: 'uppercase',
                                      padding: '2px 8px',
                                      borderRadius: '999px',
                                      background: log.action === 'timeout' ? 'rgba(239,68,68,0.15)' : log.action === 'warned' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
                                      color: log.action === 'timeout' ? '#f87171' : log.action === 'warned' ? '#fbbf24' : '#60a5fa'
                                    }}>
                                      {log.action}
                                    </span>
                                  </td>
                                  <td style={{ padding: '8px 12px', color: 'var(--text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {log.messageContent ? log.messageContent.substring(0, 80) : '—'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 3: WELCOME SYSTEM */}
              {/* TAB: ANTINUKE PROTECTION */}
              {activeTab === 'antinuke' && settings && settings.antinuke && (
                <div>

                  {/* Main Enable Panel */}
                  <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Anti-Nuker System Status</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Globally enable or disable automated protection actions against malicious actions.</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.antinuke.enabled || false} 
                          onChange={() => handleToggle('antinuke.enabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {settings.antinuke.enabled && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Breach Response Action</label>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Punishment applied to administrators who breach limit thresholds.</p>
                            <select 
                              className="glass-input" 
                              value={settings.antinuke.punishment || 'stripall'}
                              onChange={(e) => handleInputChange('antinuke.punishment', e.target.value)}
                            >
                              <option value="stripall">Strip Admin Roles (Remove permissions)</option>
                              <option value="ban">Ban Executor</option>
                              <option value="kick">Kick Executor</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Action Limit Threshold</label>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Number of dangerous actions allowed before triggering penalty.</p>
                            <input 
                              type="number" 
                              min="1" 
                              max="100"
                              value={settings.antinuke.threshold ?? 3}
                              onChange={(e) => handleInputChange('antinuke.threshold', e.target.value === '' ? '' : parseInt(e.target.value))}
                              className="glass-input" 
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Rate Limit Timeframe (seconds)</label>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Duration in seconds to track consecutive actions.</p>
                            <input 
                              type="number" 
                              min="1" 
                              max="3600"
                              value={settings.antinuke.timeframe ?? 60}
                              onChange={(e) => handleInputChange('antinuke.timeframe', e.target.value === '' ? '' : parseInt(e.target.value))}
                              className="glass-input" 
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Alert Log Channel</label>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Channel where automatic alerts and logs are sent.</p>
                            <select 
                              className="glass-input" 
                              value={settings.antinuke.logChannelId || ''}
                              onChange={(e) => handleInputChange('antinuke.logChannelId', e.target.value)}
                            >
                              <option value="">System Default Channel</option>
                              {channels.map(ch => (
                                <option key={ch.id} value={ch.id}>#{ch.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {settings.antinuke.enabled && (
                    <>
                      {/* Grid for Actions & Limits */}
                      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>Protection Action Controls</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Enable specific protective monitors to defend your server against malicious activities.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                          {[
                            { key: 'antiBan', title: 'Anti-Ban Monitor', desc: 'Prevents rogue staff from mass banning members.' },
                            { key: 'antiKick', title: 'Anti-Kick Monitor', desc: 'Prevents rogue staff from mass kicking members.' },
                            { key: 'antiChannelCreate', title: 'Anti-Channel Create', desc: 'Prevents spam creation of channels by malicious accounts.' },
                            { key: 'antiChannelDelete', title: 'Anti-Channel Delete', desc: 'Prevents rogue staff from deleting channels.' },
                            { key: 'antiRoleCreate', title: 'Anti-Role Create', desc: 'Prevents creation of dangerous roles.' },
                            { key: 'antiRoleDelete', title: 'Anti-Role Delete', desc: 'Prevents rogue staff from deleting roles.' },
                            { key: 'antiRoleUpdate', title: 'Anti-Role Update', desc: 'Prevents adding dangerous permissions (e.g. Administrator) to roles.' },
                            { key: 'antiWebhook', title: 'Anti-Webhook Create', desc: 'Prevents unauthorized creation of webhooks.' },
                            { key: 'antiBot', title: 'Anti-Bot Additions', desc: 'Instantly kick unauthorized bots added to the server.' },
                            { key: 'antiGuildUpdate', title: 'Anti-Guild Update', desc: 'Prevents unauthorized editing of server settings.' },
                            { key: 'antiEmoji', title: 'Anti-Emoji Changes', desc: 'Prevents mass creation/deletion/editing of emojis.' },
                            { key: 'antiChannelEdit', title: 'Anti-Channel Edit', desc: 'Prevents mass unauthorized editing of channels.' }
                          ].map(opt => (
                            <div key={opt.key} className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                              <div style={{ flex: 1, marginRight: '16px' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>{opt.title}</h4>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{opt.desc}</p>
                              </div>
                              <label className="switch">
                                <input 
                                  type="checkbox" 
                                  checked={settings.antinuke[opt.key] || false} 
                                  onChange={() => handleToggle(`antinuke.${opt.key}`)}
                                />
                                <span className="slider"></span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Whitelisted Users Whitelist manager */}
                      <div className="glass-panel" style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.01)', overflow: 'visible' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>Whitelisted Administrators</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Whitelisted users bypass anti-nuker restrictions. Guild owner and the bot itself are whitelisted by default.</p>

                        <div style={{ position: 'relative', zIndex: 10, marginBottom: '24px' }}>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Search and Add Administrator to Whitelist</label>
                          
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                              <input 
                                type="text" 
                                placeholder="Type username or member ID to search..." 
                                value={memberSearchQuery}
                                onChange={(e) => setMemberSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleManualAddWhitelist();
                                  }
                                }}
                                className="glass-input" 
                                style={{ width: '100%', padding: '12px' }}
                              />
                              {searchLoading && (
                                <div style={{ position: 'absolute', right: '15px', top: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Searching...</div>
                              )}
                            </div>
                            <button 
                              type="button" 
                              onClick={handleManualAddWhitelist}
                              className="btn-primary"
                              style={{ padding: '0 24px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              Add
                            </button>
                          </div>

                          {searchedMembers.length > 0 && (
                            <div 
                              style={{ 
                                position: 'absolute', 
                                left: 0, 
                                right: 0, 
                                top: '100%', 
                                background: 'rgba(25, 25, 35, 0.98)', 
                                border: '1px solid var(--border-color)', 
                                borderRadius: '8px', 
                                marginTop: '5px', 
                                maxHeight: '200px', 
                                overflowY: 'auto',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(10px)',
                                zIndex: 1000
                              }}
                            >
                              {searchedMembers
                                .filter(m => !(settings.antinuke.whitelistedUsers || []).some(u => u.userId === m.id))
                                .map(m => (
                                  <div 
                                    key={m.id} 
                                    onClick={() => { handleAddWhitelist(m.id, selectedWhitelistEvents, m); setMemberSearchQuery(''); }} 
                                    style={{ 
                                      display: 'flex', 
                                      alignItems: 'center', 
                                      gap: '12px', 
                                      padding: '10px 14px', 
                                      cursor: 'pointer', 
                                      borderBottom: '1px solid rgba(255,255,255,0.05)' 
                                    }}
                                    className="search-item"
                                  >
                                    <img 
                                      src={m.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} 
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{m.displayName}</span>
                                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@{m.username} • {m.id}</span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}

                          {/* Specific Event Whitelist Selection */}
                          <div style={{ marginTop: '14px', padding: '16px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                              Optional: Whitelist only for specific events (Keep unselected to whitelist for ALL events)
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px' }}>
                              {[
                                { id: 'ban', label: 'Anti Ban' },
                                { id: 'kick', label: 'Anti Kick' },
                                { id: 'channel_create', label: 'Anti Channel Create' },
                                { id: 'channel_delete', label: 'Anti Channel Delete' },
                                { id: 'role_create', label: 'Anti Role Create' },
                                { id: 'role_delete', label: 'Anti Role Delete' },
                                { id: 'role_update', label: 'Anti Role Update' },
                                { id: 'webhook_create', label: 'Anti Webhook' },
                                { id: 'bot_add', label: 'Anti Bot' },
                                { id: 'guild_update', label: 'Anti Guild Update' },
                                { id: 'emoji_create', label: 'Anti Emoji Create' },
                                { id: 'emoji_delete', label: 'Anti Emoji Delete' },
                                { id: 'emoji_update', label: 'Anti Emoji Update' },
                                { id: 'channel_edit', label: 'Anti Channel Edit' }
                              ].map(evOpt => (
                                <label key={evOpt.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                                  <input 
                                    type="checkbox"
                                    checked={selectedWhitelistEvents.includes(evOpt.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedWhitelistEvents(prev => [...prev, evOpt.id]);
                                      } else {
                                        setSelectedWhitelistEvents(prev => prev.filter(x => x !== evOpt.id));
                                      }
                                    }}
                                  />
                                  {evOpt.label}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '10px' }}>Whitelisted Admins:</h4>
                          {(settings.antinuke.whitelistedUsers || []).length === 0 ? (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No custom whitelisted users. Only the Server Owner and Bot have bypass privileges.</p>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {(settings.antinuke.whitelistedUsers || []).map(entry => {
                                const details = getMemberDetails(entry.userId);
                                return (
                                  <div 
                                    key={entry.userId} 
                                    style={{ 
                                      display: 'flex', 
                                      alignItems: 'center', 
                                      justifyContent: 'space-between',
                                      padding: '10px 16px', 
                                      borderRadius: '8px', 
                                      background: 'rgba(255,255,255,0.03)',
                                      border: '1px solid var(--border-color)' 
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      <img 
                                        src={details.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                                      />
                                      <div>
                                        <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: '600' }}>
                                          {details.displayName} {details.username && details.username !== entry.userId && `(@${details.username})`} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>(ID: {entry.userId})</span>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                          Added by: {entry.addedBy || 'Unknown'} • Whitelisted for: {(!entry.events || entry.events.length === 0) ? 'All Events' : entry.events.join(', ')}
                                        </div>
                                      </div>
                                    </div>
                                    <button 
                                      type="button" 
                                      onClick={() => handleRemoveWhitelist(entry.userId)} 
                                      className="btn-danger"
                                      style={{ 
                                        border: 'none', 
                                        background: 'rgba(239, 68, 68, 0.1)', 
                                        color: 'var(--danger)', 
                                        cursor: 'pointer', 
                                        padding: '6px 12px', 
                                        borderRadius: '4px',
                                        fontSize: '0.8rem', 
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'welcome' && (
                <div>

                  <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)', overflow: 'visible' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Welcome Messages & Cards</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Send an automated canvas image card or message when members join.</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.welcome.enabled} 
                          onChange={() => handleToggle('welcome.enabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {settings.welcome.enabled && (
                      <div className="welcome-split-layout" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <div className="welcome-settings-column">

                        {/* Welcome Message Layout Selection */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 'bold' }}>Welcome Message Layout Type</label>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                            {[
                              { id: 'classic', title: 'Classic Card', desc: 'Message text + image card attachment' },
                              { id: 'embed-card', title: 'Embed with Card', desc: 'Rich embed with card image loaded inside' },
                              { id: 'embed-only', title: 'Embed Only', desc: 'Rich embed only (no card image)' },
                              { id: 'text-only', title: 'Text Message Only', desc: 'Plain text message only' }
                            ].map(layoutOption => (
                              <div
                                key={layoutOption.id}
                                onClick={() => handleInputChange('welcome.layoutType', layoutOption.id)}
                                style={{
                                  padding: '12px 14px',
                                  borderRadius: '10px',
                                  border: `2px solid ${settings.welcome.layoutType === layoutOption.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}`,
                                  backgroundColor: settings.welcome.layoutType === layoutOption.id ? 'var(--primary-glow)' : 'rgba(255,255,255,0.02)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '4px'
                                }}
                              >
                                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: settings.welcome.layoutType === layoutOption.id ? '#ffffff' : 'var(--text-secondary)' }}>
                                  {layoutOption.title}
                                </span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: '1rem' }}>
                                  {layoutOption.desc}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Channel and Font Family Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Greeting Channel</label>
                            <select 
                              value={settings.welcome.channelId}
                              onChange={(e) => handleInputChange('welcome.channelId', e.target.value)}
                              className="glass-input"
                            >
                              <option value="">-- Select Channel --</option>
                              {channels.map(ch => (
                                <option key={ch.id} value={ch.id}>#{ch.name}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Font Family</label>
                            <select 
                              value={settings.welcome.fontFamily || 'Ethnocentric'}
                              onChange={(e) => handleInputChange('welcome.fontFamily', e.target.value)}
                              className="glass-input"
                            >
                              <option value="Ethnocentric">Ethnocentric (Futuristic) (Default)</option>
                              <option value="Oxanium">Oxanium (Cyberpunk)</option>
                              <option value="Sans">Sans-Serif</option>
                              <option value="Poppins">Poppins</option>
                              <option value="Montserrat">Montserrat</option>
                              <option value="Bebas Neue">Bebas Neue</option>
                              <option value="Orbitron">Orbitron</option>
                              <option value="Oswald">Oswald</option>
                              <option value="Inter">Inter</option>
                              <option value="Roboto">Roboto</option>
                              <option value="Permanent Marker">Permanent Marker (Brush)</option>
                            </select>
                          </div>
                        </div>

                        {/* Redirect Channels Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Redirect Channel Link 1</label>
                            <select 
                              value={settings.welcome.redirectChannelId || ''}
                              onChange={(e) => handleInputChange('welcome.redirectChannelId', e.target.value)}
                              className="glass-input"
                            >
                              <option value="">-- No redirect channel --</option>
                              {channels.map(ch => (
                                <option key={ch.id} value={ch.id}>#{ch.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Redirect Channel Link 2</label>
                            <select 
                              value={settings.welcome.redirectChannelId2 || ''}
                              onChange={(e) => handleInputChange('welcome.redirectChannelId2', e.target.value)}
                              className="glass-input"
                            >
                              <option value="">-- No redirect channel --</option>
                              {channels.map(ch => (
                                <option key={ch.id} value={ch.id}>#{ch.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Redirect Channel Link 3</label>
                            <select 
                              value={settings.welcome.redirectChannelId3 || ''}
                              onChange={(e) => handleInputChange('welcome.redirectChannelId3', e.target.value)}
                              className="glass-input"
                            >
                              <option value="">-- No redirect channel --</option>
                              {channels.map(ch => (
                                <option key={ch.id} value={ch.id}>#{ch.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Welcomes Card Colors Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Title Color (Hex)</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <input 
                                type="color" 
                                value={settings.welcome.textColor?.startsWith('#') ? settings.welcome.textColor : `#${settings.welcome.textColor || 'ffffff'}`}
                                onChange={(e) => handleInputChange('welcome.textColor', e.target.value)}
                                style={{ width: '40px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'none', cursor: 'pointer' }}
                              />
                              <input 
                                type="text"
                                value={settings.welcome.textColor || '#ffffff'}
                                onChange={(e) => handleInputChange('welcome.textColor', e.target.value)}
                                className="glass-input"
                                placeholder="#ffffff"
                              />
                            </div>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Username Color (Hex)</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <input 
                                type="color" 
                                value={settings.welcome.usernameColor?.startsWith('#') ? settings.welcome.usernameColor : `#${settings.welcome.usernameColor || '2563eb'}`}
                                onChange={(e) => handleInputChange('welcome.usernameColor', e.target.value)}
                                style={{ width: '40px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'none', cursor: 'pointer' }}
                              />
                              <input 
                                type="text"
                                value={settings.welcome.usernameColor || '#2563eb'}
                                onChange={(e) => handleInputChange('welcome.usernameColor', e.target.value)}
                                className="glass-input"
                                placeholder="#2563eb"
                              />
                            </div>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Subtext Color (Hex)</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <input 
                                type="color" 
                                value={settings.welcome.subtextColor?.startsWith('#') ? settings.welcome.subtextColor : `#${settings.welcome.subtextColor || 'ffffff'}`}
                                onChange={(e) => handleInputChange('welcome.subtextColor', e.target.value)}
                                style={{ width: '40px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'none', cursor: 'pointer' }}
                              />
                              <input 
                                type="text"
                                value={settings.welcome.subtextColor || 'rgba(255, 255, 255, 0.7)'}
                                onChange={(e) => handleInputChange('welcome.subtextColor', e.target.value)}
                                className="glass-input"
                                placeholder="rgba(255, 255, 255, 0.7)"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Font Weight and Text Alignment */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Font Weight</label>
                            <select 
                              value={settings.welcome.fontWeight || 'bold'}
                              onChange={(e) => handleInputChange('welcome.fontWeight', e.target.value)}
                              className="glass-input"
                            >
                              <option value="normal">Normal</option>
                              <option value="medium">Medium (500)</option>
                              <option value="600">Semi-Bold (600)</option>
                              <option value="bold">Bold (700)</option>
                              <option value="900">Extra-Bold (900)</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Text Alignment</label>
                            <select 
                              value={settings.welcome.textAlignment || 'center'}
                              onChange={(e) => handleInputChange('welcome.textAlignment', e.target.value)}
                              className="glass-input"
                            >
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                            </select>
                          </div>
                        </div>

                        {/* Welcome Message Text */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Welcome Message Template (Supports {`{user}`}, {`{username}`}, {`{server}`}, {`{channel}`}, {`{channel2}`}, {`{channel3}`})</label>
                          <textarea 
                            value={settings.welcome.message}
                            onChange={(e) => handleInputChange('welcome.message', e.target.value)}
                            className="glass-input"
                            placeholder="Welcome {user} to the server!"
                            rows="3"
                            style={{ minHeight: '80px', resize: 'vertical', fontFamily: 'inherit' }}
                          />
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                            If any Redirect Channels are selected, buttons linking to them will also be attached automatically (up to 3 links).
                          </span>
                        </div>

                        {/* Welcome Card Custom Text Templates */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Card Title Text Template</label>
                            <input 
                              type="text"
                              value={settings.welcome.titleText !== undefined ? settings.welcome.titleText : 'WELCOME'}
                              onChange={(e) => handleInputChange('welcome.titleText', e.target.value)}
                              className="glass-input"
                              placeholder="e.g. WELCOME"
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Card Subtext Template (Supports {`{server}`})</label>
                            <input 
                              type="text"
                              value={settings.welcome.subtextText !== undefined ? settings.welcome.subtextText : 'TO {server}'}
                              onChange={(e) => handleInputChange('welcome.subtextText', e.target.value)}
                              className="glass-input"
                              placeholder="e.g. TO {server}"
                            />
                          </div>
                        </div>

                        {/* Background Upload and controls */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Background Image/GIF URL or Solid Color Hex</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <input 
                                type="text"
                                value={settings.welcome.background}
                                onChange={(e) => handleInputChange('welcome.background', e.target.value)}
                                className="glass-input"
                                placeholder="https://example.com/background.png or #0F0C20"
                              />
                              <label className="btn-secondary" style={{ padding: '10px 16px', cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
                                Upload File
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    setUploadFile(file);
                                    setShowCropModal(true);
                                    e.target.value = null; // Clear so same file works again
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          <div style={{ marginTop: '24px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                              <input 
                                type="checkbox"
                                checked={settings.welcome.gifSupport}
                                onChange={() => handleToggle('welcome.gifSupport')}
                              />
                              Enable GIF URL Embed
                            </label>
                          </div>
                        </div>

                        {/* Control Customizers and Live Preview Grid */}
                        <div className="welcome-preview-grid">
                          
                          {/* Element Sliders */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                              <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>Welcome Card Elements Sizing</h4>
                              <button 
                                type="button"
                                onClick={handleResetLayout}
                                className="btn-secondary"
                                style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px', cursor: 'pointer' }}
                              >
                                Reset Layout
                              </button>
                            </div>
                            
                            {/* Add/Remove Action Buttons */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '4px 0 12px 0', padding: '10px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
                              <div style={{ width: '100%', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '4px' }}>Toggle Card Elements:</div>
                              
                              {/* Profile Toggle Button */}
                              {settings.welcome.avatarEnabled !== false ? (
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('welcome.avatarEnabled', false)}
                                  className="btn-danger"
                                  style={{ padding: '4px 10px', fontSize: '0.72rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', height: '28px', border: 'none' }}
                                >
                                  <Trash2 size={12} /> Remove Profile
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('welcome.avatarEnabled', true)}
                                  className="btn-primary"
                                  style={{ padding: '4px 10px', fontSize: '0.72rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', height: '28px', border: 'none' }}
                                >
                                  <Plus size={12} /> Add Profile
                                </button>
                              )}

                              {/* Title Toggle Button */}
                              {settings.welcome.titleEnabled !== false ? (
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('welcome.titleEnabled', false)}
                                  className="btn-danger"
                                  style={{ padding: '4px 10px', fontSize: '0.72rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', height: '28px', border: 'none' }}
                                >
                                  <Trash2 size={12} /> Remove Title
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('welcome.titleEnabled', true)}
                                  className="btn-primary"
                                  style={{ padding: '4px 10px', fontSize: '0.72rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', height: '28px', border: 'none' }}
                                >
                                  <Plus size={12} /> Add Title
                                </button>
                              )}

                              {/* Username Toggle Button */}
                              {settings.welcome.usernameEnabled !== false ? (
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('welcome.usernameEnabled', false)}
                                  className="btn-danger"
                                  style={{ padding: '4px 10px', fontSize: '0.72rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', height: '28px', border: 'none' }}
                                >
                                  <Trash2 size={12} /> Remove Username
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('welcome.usernameEnabled', true)}
                                  className="btn-primary"
                                  style={{ padding: '4px 10px', fontSize: '0.72rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', height: '28px', border: 'none' }}
                                >
                                  <Plus size={12} /> Add Username
                                </button>
                              )}

                              {/* Subtext Toggle Button */}
                              {settings.welcome.subtextEnabled !== false ? (
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('welcome.subtextEnabled', false)}
                                  className="btn-danger"
                                  style={{ padding: '4px 10px', fontSize: '0.72rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', height: '28px', border: 'none' }}
                                >
                                  <Trash2 size={12} /> Remove Subtext
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleInputChange('welcome.subtextEnabled', true)}
                                  className="btn-primary"
                                  style={{ padding: '4px 10px', fontSize: '0.72rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', height: '28px', border: 'none' }}
                                >
                                  <Plus size={12} /> Add Subtext
                                </button>
                              )}
                            </div>
                            
                            {/* Profile Picture Control Group */}
                            <div style={{ 
                              padding: '12px', 
                              borderRadius: '10px', 
                              backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                              border: '1px solid rgba(255, 255, 255, 0.05)',
                              marginBottom: '4px'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Profile Picture (Pfp)</span>
                                <label className="switch">
                                  <input 
                                    type="checkbox" 
                                    checked={settings.welcome.avatarEnabled !== false} 
                                    onChange={() => handleInputChange('welcome.avatarEnabled', !(settings.welcome.avatarEnabled !== false))}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>

                              {settings.welcome.avatarEnabled !== false ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                                  {/* Avatar Size */}
                                  <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                      <span>Pfp Size</span>
                                      <span>{settings.welcome.avatarSize || 140}px</span>
                                    </div>
                                    <input 
                                      type="range" min="50" max="250" step="5"
                                      value={settings.welcome.avatarSize || 140}
                                      onChange={(e) => handleInputChange('welcome.avatarSize', parseInt(e.target.value))}
                                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                  </div>

                                  {/* Avatar Rotation */}
                                  <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                      <span>Pfp Rotation</span>
                                      <span>{settings.welcome.avatarRotation || 0}°</span>
                                    </div>
                                    <input 
                                      type="range" min="0" max="360" step="5"
                                      value={settings.welcome.avatarRotation || 0}
                                      onChange={(e) => handleInputChange('welcome.avatarRotation', parseInt(e.target.value))}
                                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                  </div>

                                  {/* Border Size & Color */}
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '10px' }}>
                                    <div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        <span>Border Thickness</span>
                                        <span>{settings.welcome.avatarBorderThickness !== undefined ? settings.welcome.avatarBorderThickness : 6}px</span>
                                      </div>
                                      <input 
                                        type="range" min="0" max="20" step="1"
                                        value={settings.welcome.avatarBorderThickness !== undefined ? settings.welcome.avatarBorderThickness : 6}
                                        onChange={(e) => handleInputChange('welcome.avatarBorderThickness', parseInt(e.target.value))}
                                        style={{ width: '100%', accentColor: 'var(--primary)' }}
                                      />
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2px' }}>Border Color</label>
                                      <input 
                                        type="color" 
                                        value={settings.welcome.avatarBorderColor || '#ffffff'}
                                        onChange={(e) => handleInputChange('welcome.avatarBorderColor', e.target.value)}
                                        style={{ width: '100%', height: '24px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', background: 'none' }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '4px 0' }}>
                                  Profile Picture is disabled and hidden from the welcome card.
                                </div>
                              )}
                            </div>

                            {/* Title Text Control Group */}
                            <div style={{ 
                              padding: '12px', 
                              borderRadius: '10px', 
                              backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                              border: '1px solid rgba(255, 255, 255, 0.05)',
                              marginBottom: '4px'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Title Text ("WELCOME")</span>
                                <label className="switch">
                                  <input 
                                    type="checkbox" 
                                    checked={settings.welcome.titleEnabled !== false} 
                                    onChange={() => handleInputChange('welcome.titleEnabled', !(settings.welcome.titleEnabled !== false))}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>

                              {settings.welcome.titleEnabled !== false ? (
                                <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                      <span>Title Text Size</span>
                                      <span>{settings.welcome.titleSize || 54}px</span>
                                    </div>
                                    <input 
                                      type="range" min="12" max="100" step="1"
                                      value={settings.welcome.titleSize || 54}
                                      onChange={(e) => handleInputChange('welcome.titleSize', parseInt(e.target.value))}
                                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'center' }}>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Font Family</label>
                                      <select 
                                        value={settings.welcome.titleFontFamily || ''}
                                        onChange={(e) => handleInputChange('welcome.titleFontFamily', e.target.value)}
                                        className="glass-input"
                                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                                      >
                                        <option value="">Use Global Font</option>
                                        <option value="Sans">Sans-Serif (Default)</option>
                                        <option value="Poppins">Poppins</option>
                                        <option value="Montserrat">Montserrat</option>
                                        <option value="Bebas Neue">Bebas Neue</option>
                                        <option value="Orbitron">Orbitron</option>
                                        <option value="Oswald">Oswald</option>
                                        <option value="Inter">Inter</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Ethnocentric">Ethnocentric (Futuristic)</option>
                                        <option value="Oxanium">Oxanium (Cyberpunk)</option>
                                        <option value="Permanent Marker">Permanent Marker (Brush)</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', textAlign: 'center' }}>Italic</label>
                                      <label className="switch" style={{ scale: '0.85' }}>
                                        <input 
                                          type="checkbox" 
                                          checked={settings.welcome.titleFontStyle === 'italic'} 
                                          onChange={(e) => handleInputChange('welcome.titleFontStyle', e.target.checked ? 'italic' : 'normal')}
                                        />
                                        <span className="slider"></span>
                                      </label>
                                    </div>
                                  </div>

                                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Neon Glow Effect</span>
                                      <label className="switch" style={{ scale: '0.8' }}>
                                        <input 
                                          type="checkbox" 
                                          checked={settings.welcome.titleGlowEnabled || false} 
                                          onChange={(e) => handleInputChange('welcome.titleGlowEnabled', e.target.checked)}
                                        />
                                        <span className="slider"></span>
                                      </label>
                                    </div>
                                    {settings.welcome.titleGlowEnabled && (
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
                                        <div>
                                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            <span>Glow Radius</span>
                                            <span>{settings.welcome.titleGlowBlur || 10}px</span>
                                          </div>
                                          <input 
                                            type="range" min="1" max="40" step="1"
                                            value={settings.welcome.titleGlowBlur || 10}
                                            onChange={(e) => handleInputChange('welcome.titleGlowBlur', parseInt(e.target.value))}
                                            style={{ width: '100%', accentColor: 'var(--primary)' }}
                                          />
                                        </div>
                                        <div>
                                          <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2px' }}>Color</label>
                                          <input 
                                            type="color" 
                                            value={settings.welcome.titleGlowColor || '#00ff66'}
                                            onChange={(e) => handleInputChange('welcome.titleGlowColor', e.target.value)}
                                            style={{ width: '100%', height: '20px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', background: 'none' }}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '4px 0' }}>
                                  Title Text is disabled and hidden from the welcome card.
                                </div>
                              )}
                            </div>

                            {/* Username Text Control Group */}
                            <div style={{ 
                              padding: '12px', 
                              borderRadius: '10px', 
                              backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                              border: '1px solid rgba(255, 255, 255, 0.05)',
                              marginBottom: '4px'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Username Text</span>
                                <label className="switch">
                                  <input 
                                    type="checkbox" 
                                    checked={settings.welcome.usernameEnabled !== false} 
                                    onChange={() => handleInputChange('welcome.usernameEnabled', !(settings.welcome.usernameEnabled !== false))}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>

                              {settings.welcome.usernameEnabled !== false ? (
                                <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                      <span>Username Text Size</span>
                                      <span>{settings.welcome.usernameSize || 38}px</span>
                                    </div>
                                    <input 
                                      type="range" min="12" max="100" step="1"
                                      value={settings.welcome.usernameSize || 38}
                                      onChange={(e) => handleInputChange('welcome.usernameSize', parseInt(e.target.value))}
                                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'center' }}>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Font Family</label>
                                      <select 
                                        value={settings.welcome.usernameFontFamily || ''}
                                        onChange={(e) => handleInputChange('welcome.usernameFontFamily', e.target.value)}
                                        className="glass-input"
                                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                                      >
                                        <option value="">Use Global Font</option>
                                        <option value="Sans">Sans-Serif (Default)</option>
                                        <option value="Poppins">Poppins</option>
                                        <option value="Montserrat">Montserrat</option>
                                        <option value="Bebas Neue">Bebas Neue</option>
                                        <option value="Orbitron">Orbitron</option>
                                        <option value="Oswald">Oswald</option>
                                        <option value="Inter">Inter</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Ethnocentric">Ethnocentric (Futuristic)</option>
                                        <option value="Oxanium">Oxanium (Cyberpunk)</option>
                                        <option value="Permanent Marker">Permanent Marker (Brush)</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', textAlign: 'center' }}>Italic</label>
                                      <label className="switch" style={{ scale: '0.85' }}>
                                        <input 
                                          type="checkbox" 
                                          checked={settings.welcome.usernameFontStyle === 'italic'} 
                                          onChange={(e) => handleInputChange('welcome.usernameFontStyle', e.target.checked ? 'italic' : 'normal')}
                                        />
                                        <span className="slider"></span>
                                      </label>
                                    </div>
                                  </div>

                                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Neon Glow Effect</span>
                                      <label className="switch" style={{ scale: '0.8' }}>
                                        <input 
                                          type="checkbox" 
                                          checked={settings.welcome.usernameGlowEnabled || false} 
                                          onChange={(e) => handleInputChange('welcome.usernameGlowEnabled', e.target.checked)}
                                        />
                                        <span className="slider"></span>
                                      </label>
                                    </div>
                                    {settings.welcome.usernameGlowEnabled && (
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
                                        <div>
                                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            <span>Glow Radius</span>
                                            <span>{settings.welcome.usernameGlowBlur || 10}px</span>
                                          </div>
                                          <input 
                                            type="range" min="1" max="40" step="1"
                                            value={settings.welcome.usernameGlowBlur || 10}
                                            onChange={(e) => handleInputChange('welcome.usernameGlowBlur', parseInt(e.target.value))}
                                            style={{ width: '100%', accentColor: 'var(--primary)' }}
                                          />
                                        </div>
                                        <div>
                                          <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2px' }}>Color</label>
                                          <input 
                                            type="color" 
                                            value={settings.welcome.usernameGlowColor || '#2563eb'}
                                            onChange={(e) => handleInputChange('welcome.usernameGlowColor', e.target.value)}
                                            style={{ width: '100%', height: '20px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', background: 'none' }}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '4px 0' }}>
                                  Username Text is disabled and hidden from the welcome card.
                                </div>
                              )}
                            </div>

                            {/* Subtext Text Control Group */}
                            <div style={{ 
                              padding: '12px', 
                              borderRadius: '10px', 
                              backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                              border: '1px solid rgba(255, 255, 255, 0.05)',
                              marginBottom: '4px'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Subtext Text</span>
                                <label className="switch">
                                  <input 
                                    type="checkbox" 
                                    checked={settings.welcome.subtextEnabled !== false} 
                                    onChange={() => handleInputChange('welcome.subtextEnabled', !(settings.welcome.subtextEnabled !== false))}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>

                              {settings.welcome.subtextEnabled !== false ? (
                                <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                      <span>Subtext Text Size</span>
                                      <span>{settings.welcome.subtextSize || 22}px</span>
                                    </div>
                                    <input 
                                      type="range" min="10" max="60" step="1"
                                      value={settings.welcome.subtextSize || 22}
                                      onChange={(e) => handleInputChange('welcome.subtextSize', parseInt(e.target.value))}
                                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'center' }}>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Font Family</label>
                                      <select 
                                        value={settings.welcome.subtextFontFamily || ''}
                                        onChange={(e) => handleInputChange('welcome.subtextFontFamily', e.target.value)}
                                        className="glass-input"
                                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                                      >
                                        <option value="">Use Global Font</option>
                                        <option value="Sans">Sans-Serif (Default)</option>
                                        <option value="Poppins">Poppins</option>
                                        <option value="Montserrat">Montserrat</option>
                                        <option value="Bebas Neue">Bebas Neue</option>
                                        <option value="Orbitron">Orbitron</option>
                                        <option value="Oswald">Oswald</option>
                                        <option value="Inter">Inter</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Ethnocentric">Ethnocentric (Futuristic)</option>
                                        <option value="Oxanium">Oxanium (Cyberpunk)</option>
                                        <option value="Permanent Marker">Permanent Marker (Brush)</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', textAlign: 'center' }}>Italic</label>
                                      <label className="switch" style={{ scale: '0.85' }}>
                                        <input 
                                          type="checkbox" 
                                          checked={settings.welcome.subtextFontStyle === 'italic'} 
                                          onChange={(e) => handleInputChange('welcome.subtextFontStyle', e.target.checked ? 'italic' : 'normal')}
                                        />
                                        <span className="slider"></span>
                                      </label>
                                    </div>
                                  </div>

                                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Neon Glow Effect</span>
                                      <label className="switch" style={{ scale: '0.8' }}>
                                        <input 
                                          type="checkbox" 
                                          checked={settings.welcome.subtextGlowEnabled || false} 
                                          onChange={(e) => handleInputChange('welcome.subtextGlowEnabled', e.target.checked)}
                                        />
                                        <span className="slider"></span>
                                      </label>
                                    </div>
                                    {settings.welcome.subtextGlowEnabled && (
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
                                        <div>
                                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            <span>Glow Radius</span>
                                            <span>{settings.welcome.subtextGlowBlur || 10}px</span>
                                          </div>
                                          <input 
                                            type="range" min="1" max="40" step="1"
                                            value={settings.welcome.subtextGlowBlur || 10}
                                            onChange={(e) => handleInputChange('welcome.subtextGlowBlur', parseInt(e.target.value))}
                                            style={{ width: '100%', accentColor: 'var(--primary)' }}
                                          />
                                        </div>
                                        <div>
                                          <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2px' }}>Color</label>
                                          <input 
                                            type="color" 
                                            value={settings.welcome.subtextGlowColor || '#00ff66'}
                                            onChange={(e) => handleInputChange('welcome.subtextGlowColor', e.target.value)}
                                            style={{ width: '100%', height: '20px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', background: 'none' }}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '4px 0' }}>
                                  Subtext Text is disabled and hidden from the welcome card.
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Column 2: Advanced Visual Styles */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary)', margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', height: '28px', display: 'flex', alignItems: 'center' }}>Advanced Visual Styles</h4>
                            
                            {/* 1. Background Overlay Tint */}
                            <div className="glass-panel" style={{ padding: '12px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px', marginTop: '14px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Dark Background Overlay</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{Math.round((settings.welcome.overlayOpacity !== undefined ? settings.welcome.overlayOpacity : 0.3) * 100)}% Opacity</span>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '10px', alignItems: 'center' }}>
                                <input 
                                  type="range" min="0" max="1" step="0.05"
                                  value={settings.welcome.overlayOpacity !== undefined ? settings.welcome.overlayOpacity : 0.3}
                                  onChange={(e) => handleInputChange('welcome.overlayOpacity', parseFloat(e.target.value))}
                                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                                />
                                <input 
                                  type="color" 
                                  value={settings.welcome.overlayColor || '#000000'}
                                  onChange={(e) => handleInputChange('welcome.overlayColor', e.target.value)}
                                  style={{ width: '100%', height: '24px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', background: 'none' }}
                                />
                              </div>
                            </div>

                            {/* 2. Text Shadow Effect */}
                            <div className="glass-panel" style={{ padding: '12px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <span style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block' }}>Text Shadow Glow</span>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Adds readable shadow behind card texts</span>
                                </div>
                                <label className="switch">
                                  <input 
                                    type="checkbox" 
                                    checked={settings.welcome.textShadowEnabled || false} 
                                    onChange={() => handleToggle('welcome.textShadowEnabled')}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>
                              {settings.welcome.textShadowEnabled && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
                                  <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                      <span>Blur Radius</span>
                                      <span>{settings.welcome.textShadowBlur || 5}px</span>
                                    </div>
                                    <input 
                                      type="range" min="1" max="20" step="1"
                                      value={settings.welcome.textShadowBlur || 5}
                                      onChange={(e) => handleInputChange('welcome.textShadowBlur', parseInt(e.target.value))}
                                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2px' }}>Color</label>
                                    <input 
                                      type="color" 
                                      value={settings.welcome.textShadowColor || '#000000'}
                                      onChange={(e) => handleInputChange('welcome.textShadowColor', e.target.value)}
                                      style={{ width: '100%', height: '24px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', background: 'none' }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* 3. Avatar Shadow Glow */}
                            <div className="glass-panel" style={{ padding: '12px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <span style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block' }}>Profile Picture Glow</span>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Neon glow around avatar circle</span>
                                </div>
                                <label className="switch">
                                  <input 
                                    type="checkbox" 
                                    checked={settings.welcome.avatarShadowEnabled || false} 
                                    onChange={() => handleToggle('welcome.avatarShadowEnabled')}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>
                              {settings.welcome.avatarShadowEnabled && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
                                  <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                      <span>Glow Radius</span>
                                      <span>{settings.welcome.avatarShadowBlur || 15}px</span>
                                    </div>
                                    <input 
                                      type="range" min="1" max="40" step="1"
                                      value={settings.welcome.avatarShadowBlur || 15}
                                      onChange={(e) => handleInputChange('welcome.avatarShadowBlur', parseInt(e.target.value))}
                                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2px' }}>Color</label>
                                    <input 
                                      type="color" 
                                      value={settings.welcome.avatarShadowColor || '#2563eb'}
                                      onChange={(e) => handleInputChange('welcome.avatarShadowColor', e.target.value)}
                                      style={{ width: '100%', height: '24px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', background: 'none' }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* 4. Card Outer Border Frame */}
                            <div className="glass-panel" style={{ padding: '12px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <span style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block' }}>Outer Card Frame</span>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Draws frame border around canvas</span>
                                </div>
                                <label className="switch">
                                  <input 
                                    type="checkbox" 
                                    checked={settings.welcome.cardBorderEnabled || false} 
                                    onChange={() => handleToggle('welcome.cardBorderEnabled')}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>
                              {settings.welcome.cardBorderEnabled && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
                                  <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                      <span>Frame Thickness</span>
                                      <span>{settings.welcome.cardBorderThickness || 8}px</span>
                                    </div>
                                    <input 
                                      type="range" min="1" max="25" step="1"
                                      value={settings.welcome.cardBorderThickness || 8}
                                      onChange={(e) => handleInputChange('welcome.cardBorderThickness', parseInt(e.target.value))}
                                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2px' }}>Color</label>
                                    <input 
                                      type="color" 
                                      value={settings.welcome.cardBorderColor || '#2563eb'}
                                      onChange={(e) => handleInputChange('welcome.cardBorderColor', e.target.value)}
                                      style={{ width: '100%', height: '24px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', background: 'none' }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                        {/* End of welcome-settings-column */}
                        </div>

                        {/* Right Column: Sticky Discord Preview */}
                        <div className="welcome-preview-column">
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '8px' }}>
                            <Eye size={14} />
                            Interactive Discord Chat Preview (Drag elements to position)
                          </span>
                          
                          <div className="discord-chat-container">
                            <div className="discord-chat-header">
                              <span className="discord-channel-hash">#</span>
                              <span className="discord-channel-name">
                                {channels.find(c => c.id === settings.welcome.channelId)?.name || 'welcome'}
                              </span>
                              <div className="discord-channel-divider"></div>
                              <span className="discord-channel-description">Greeting channel preview</span>
                            </div>
                            
                            <div className="discord-chat-messages">
                              <div className="discord-message">
                                <img 
                                  src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                                  alt="bot avatar" 
                                  className="discord-author-avatar"
                                />
                                <div className="discord-message-content">
                                  <div className="discord-author-header">
                                    <span className="discord-author-name">TIMO X MODE</span>
                                    <span className="discord-bot-tag">BOT</span>
                                    <span className="discord-message-timestamp">Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>

                                  {/* Conditionally render preview content based on selected layoutType */}
                                  {(settings.welcome.layoutType === 'text-only' || !settings.welcome.layoutType) && (
                                    <>
                                      <div className="discord-message-text">
                                        {formatWelcomeText(settings.welcome.message)}
                                      </div>
                                      {renderRedirectButton()}
                                      <div className="discord-info-banner">
                                        <Info size={16} style={{ flexShrink: 0 }} />
                                        <span>
                                          <strong>Text Message Only</strong> layout is selected. The Canvas Card image is disabled. Select <strong>Classic Card</strong> or <strong>Embed with Card</strong> to design and position your canvas elements.
                                        </span>
                                      </div>
                                    </>
                                  )}

                                  {settings.welcome.layoutType === 'embed-only' && (
                                    <>
                                      <div className="discord-message-text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '4px' }}>
                                        Mentions {`@${user?.username || 'Member'}`}
                                      </div>
                                      <div className="discord-embed" style={{ borderLeftColor: settings.welcome.textColor || '#2563eb' }}>
                                        <div className="discord-embed-inner">
                                          <div className="discord-embed-content">
                                            <div className="discord-embed-title">
                                              Welcome to {guildName || 'Server'}!
                                            </div>
                                            <div className="discord-embed-description">
                                              {formatWelcomeText(settings.welcome.message)}
                                            </div>
                                          </div>
                                          <img 
                                            src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                                            alt="member avatar" 
                                            className="discord-embed-thumbnail"
                                          />
                                        </div>
                                      </div>
                                      {renderRedirectButton()}
                                      <div className="discord-info-banner">
                                        <Info size={16} style={{ flexShrink: 0 }} />
                                        <span>
                                          <strong>Embed Only</strong> layout is selected. The Canvas Card image is disabled. Select <strong>Classic Card</strong> or <strong>Embed with Card</strong> to design and position your canvas elements.
                                        </span>
                                      </div>
                                    </>
                                  )}

                                  {settings.welcome.layoutType === 'classic' && (
                                    <>
                                      <div className="discord-message-text">
                                        {formatWelcomeText(settings.welcome.message)}
                                      </div>
                                      <div className="discord-attachment-image">
                                        {renderCanvasCard()}
                                      </div>
                                      {renderRedirectButton()}
                                    </>
                                  )}

                                  {settings.welcome.layoutType === 'embed-card' && (
                                    <>
                                      <div className="discord-message-text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '4px' }}>
                                        Mentions {`@${user?.username || 'Member'}`}
                                      </div>
                                      <div className="discord-embed" style={{ borderLeftColor: settings.welcome.textColor || '#2563eb' }}>
                                        <div className="discord-embed-inner">
                                          <div className="discord-embed-content">
                                            <div className="discord-embed-title">
                                              Welcome to {guildName || 'Server'}!
                                            </div>
                                            <div className="discord-embed-description">
                                              {formatWelcomeText(settings.welcome.message)}
                                            </div>
                                          </div>
                                          <img 
                                            src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                                            alt="member avatar" 
                                            className="discord-embed-thumbnail"
                                          />
                                        </div>
                                        <div className="discord-embed-image">
                                          {renderCanvasCard()}
                                        </div>
                                      </div>
                                      {renderRedirectButton()}
                                    </>
                                  )}

                                </div>
                              </div>
                            </div>
                          </div>

                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', display: 'block', marginTop: '12px' }}>
                            💡 Reposition elements inside the banner by clicking and dragging them directly in the preview!
                          </span>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: VERIFICATION */}
              {activeTab === 'verification' && (
                <div>

                  <div className="preview-layout-container">
                    {/* Left Column: Form Controls */}
                    <div className="glass-panel" style={{ 
                      flex: '1 1 500px',
                      padding: '24px', 
                      backgroundColor: 'rgba(255,255,255,0.01)', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '20px' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>Role Assignment Verification</h3>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Users must verify themselves to receive a member role.</p>
                        </div>
                        <label className="switch">
                          <input 
                            type="checkbox" 
                            checked={settings.verification.enabled} 
                            onChange={() => handleToggle('verification.enabled')}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>

                      {settings.verification.enabled && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                          
                          {/* Verification Method Selection */}
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 'bold' }}>Verification Method</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                              {[
                                { id: 'button', title: 'Discord Button', desc: 'Click an interactive button to verify' },
                                { id: 'reaction', title: 'Emoji Reaction', desc: 'React with an emoji to verify (Reaction Role)' }
                              ].map(methodOption => (
                                <div
                                  key={methodOption.id}
                                  onClick={() => handleInputChange('verification.type', methodOption.id)}
                                  style={{
                                    padding: '12px 14px',
                                    borderRadius: '10px',
                                    border: `2px solid ${settings.verification.type === methodOption.id || (!settings.verification.type && methodOption.id === 'button') ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}`,
                                    backgroundColor: settings.verification.type === methodOption.id || (!settings.verification.type && methodOption.id === 'button') ? 'var(--primary-glow)' : 'rgba(255,255,255,0.02)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px'
                                  }}
                                >
                                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: settings.verification.type === methodOption.id || (!settings.verification.type && methodOption.id === 'button') ? '#ffffff' : 'var(--text-secondary)' }}>
                                    {methodOption.title}
                                  </span>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: '1rem' }}>
                                    {methodOption.desc}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Channel and Role selection */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Verification Channel</label>
                              <select 
                                value={settings.verification.channelId}
                                onChange={(e) => handleInputChange('verification.channelId', e.target.value)}
                                className="glass-input"
                              >
                                <option value="">-- Select Channel --</option>
                                {channels.map(ch => (
                                  <option key={ch.id} value={ch.id}>#{ch.name}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Role to Grant upon Verification</label>
                              <select 
                                value={settings.verification.roleId}
                                onChange={(e) => handleInputChange('verification.roleId', e.target.value)}
                                className="glass-input"
                              >
                                <option value="">-- Select Role --</option>
                                {roles.map(role => (
                                  <option key={role.id} value={role.id} style={{ color: role.color }}>{role.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Conditional Text Fields based on type */}
                          {settings.verification.type === 'reaction' ? (
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Reaction Emoji</label>
                              <input 
                                type="text" 
                                value={settings.verification.reactionEmoji || '✅'}
                                onChange={(e) => handleInputChange('verification.reactionEmoji', e.target.value)}
                                className="glass-input"
                                style={{ maxWidth: '200px' }}
                                placeholder="e.g. ✅ or custom emoji"
                              />
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                                Use a standard emoji (like ✅, ⭐, 👍) or a custom server emoji.
                              </span>
                            </div>
                          ) : (
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Verify Button Label</label>
                              <input 
                                type="text" 
                                value={settings.verification.buttonText || 'Verify'}
                                onChange={(e) => handleInputChange('verification.buttonText', e.target.value)}
                                className="glass-input"
                                placeholder="Verify"
                              />
                            </div>
                          )}

                          {/* Embed Description */}
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Verification Embed Description</label>
                            <textarea 
                              rows="3"
                              value={settings.verification.welcomeMessage || ''}
                              onChange={(e) => handleInputChange('verification.welcomeMessage', e.target.value)}
                              className="glass-input"
                              placeholder={
                                settings.verification.type === 'reaction'
                                  ? 'React to this message with the emoji below to verify and gain access to the server.'
                                  : 'Click the button below to verify your account and gain access to the server.'
                              }
                            />
                          </div>

                          {/* Publish Panel card */}
                          <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(37, 99, 235, 0.05)', borderColor: 'var(--primary-glow)' }}>
                            <div>
                              <h4 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '2px' }}>Publish Panel to Discord</h4>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Send the verification box with the interactive button/reaction directly to the selected channel.</p>
                            </div>
                            <button 
                              type="button"
                              onClick={handlePublishVerification} 
                              disabled={saving || !settings.verification.channelId || !settings.verification.roleId}
                              className="btn-success"
                              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                            >
                              Publish Embed
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Live Discord Preview */}
                    <div style={{ 
                      flex: '1 0 350px',
                      maxWidth: '520px',
                      position: 'sticky', 
                      top: '24px', 
                      zIndex: 10,
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '12px' 
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        <Eye size={14} />
                        Live Discord Preview
                      </span>
                      {settings.verification.enabled && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <DiscordMessagePreview 
                            botUser={{ username: user?.username }}
                            guildName={guildName}
                            guildIcon={guildIcon}
                            message=""
                            buttonEnabled={settings.verification.type !== 'reaction'}
                            buttonLabel={settings.verification.buttonText || 'Verify'}
                            buttonUrl=""
                            embedEnabled={true}
                            embedTitle="Verification Required"
                            embedDesc={settings.verification.welcomeMessage || (
                              settings.verification.type === 'reaction'
                                ? 'React to this message with the emoji below to verify and gain access to the server.'
                                : 'Click the button below to verify your account and gain access to the server.'
                            )}
                            embedColor="#2563eb"
                            embedThumb=""
                            embedImage=""
                            isDM={false}
                          />
                          {/* Reaction Emoji rendering beneath the preview if reaction type */}
                          {settings.verification.type === 'reaction' && (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: '#2b2d31',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              width: 'fit-content',
                              marginLeft: '56px',
                              gap: '6px',
                              border: '1px solid rgba(255,255,255,0.05)',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                              userSelect: 'none'
                            }}>
                              <span style={{ fontSize: '1.15rem' }}>{settings.verification.reactionEmoji || '✅'}</span>
                              <span style={{ fontSize: '0.8rem', color: '#949ba4', fontWeight: 'bold' }}>1</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: TICKET SYSTEM */}
              {activeTab === 'tickets' && (() => {
                const ticketCategories = settings.tickets?.categories || [];
                const useSelectMenu = ticketCategories.length >= 2;

                // Unicode emoji palette for the picker
                const unicodeEmojis = ['🎫','🐛','💰','💡','🛡️','⚙️','📝','🔧','❓','🎮','📦','🌟','💬','🔔','📋','🎯','🔥','💎','🚀','⭐','✨','🎉','🏆','💪','🤝','📊','🔒','🎨','📱','💻','🌐','📧','📞','🏠','🔍','⚡','🎵','📸','🛒','❤️','💜','💙','💚','💛','🧡','🤖','👑','🦋','🌈'];

                const handleSaveCategory = () => {
                  if (!editingCategory || !editingCategory.label) return;
                  const current = [...(settings.tickets?.categories || [])];
                  const catId = editingCategory.id || editingCategory.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30) || `cat-${Date.now()}`;
                  const catData = { ...editingCategory, id: catId };
                  if (!catData.channelPrefix) catData.channelPrefix = catId;

                  const existingIdx = current.findIndex(c => c.id === catId);
                  if (existingIdx >= 0) {
                    current[existingIdx] = catData;
                  } else {
                    current.push(catData);
                  }
                  handleInputChange('tickets.categories', current);
                  setEditingCategory(null);
                  setShowCategoryForm(false);
                  setShowEmojiPicker(false);
                };

                const handleDeleteCategory = (catId) => {
                  const current = [...(settings.tickets?.categories || [])];
                  handleInputChange('tickets.categories', current.filter(c => c.id !== catId));
                };

                const handleEditCategory = (cat) => {
                  setEditingCategory({ ...cat });
                  setShowCategoryForm(true);
                  setShowEmojiPicker(false);
                };

                const handleNewCategory = () => {
                  setEditingCategory({ id: '', label: '', description: '', emoji: '🎫', channelPrefix: '' });
                  setShowCategoryForm(true);
                  setShowEmojiPicker(false);
                };

                return (
                <div>

                  <div className="preview-layout-container">
                    {/* Left Column: Form Controls */}
                    <div className="glass-panel" style={{ 
                      flex: '1 1 500px',
                      padding: '24px', 
                      backgroundColor: 'rgba(255,255,255,0.01)', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '20px' 
                    }}>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>Enable Ticket System</h3>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Activate the support tickets functionality on your server.</p>
                        </div>
                        <label className="switch">
                          <input 
                            type="checkbox" 
                            checked={settings.tickets?.enabled || false} 
                            onChange={() => handleToggle('tickets.enabled')}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>

                      {settings.tickets?.enabled && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Ticket Panel Channel</label>
                              <select 
                                value={settings.tickets.channelId || ''}
                                onChange={(e) => handleInputChange('tickets.channelId', e.target.value)}
                                className="glass-input"
                              >
                                <option value="">-- Select Channel --</option>
                                {channels.map(ch => (
                                  <option key={ch.id} value={ch.id}>#{ch.name}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Ticket Parent Category</label>
                              <select 
                                value={settings.tickets.categoryId || ''}
                                onChange={(e) => handleInputChange('tickets.categoryId', e.target.value)}
                                className="glass-input"
                              >
                                <option value="">-- Select Category --</option>
                                {categories.map(cat => (
                                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Support Team Role</label>
                              <select 
                                value={settings.tickets.supportRoleId || ''}
                                onChange={(e) => handleInputChange('tickets.supportRoleId', e.target.value)}
                                className="glass-input"
                              >
                                <option value="">-- Select Role --</option>
                                {roles.map(role => (
                                  <option key={role.id} value={role.id} style={{ color: role.color }}>{role.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>{useSelectMenu ? 'Select Menu Placeholder' : 'Panel Button Label'}</label>
                              <input 
                                type="text" 
                                value={settings.tickets.buttonText || ''}
                                onChange={(e) => handleInputChange('tickets.buttonText', e.target.value)}
                                className="glass-input"
                                placeholder={useSelectMenu ? '🎫 Select a ticket category...' : 'Create Ticket'}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Panel Embed Title</label>
                              <input 
                                type="text" 
                                value={settings.tickets.title || ''}
                                onChange={(e) => handleInputChange('tickets.title', e.target.value)}
                                className="glass-input"
                                placeholder="Support Ticket"
                              />
                            </div>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Panel Embed Description</label>
                            <textarea 
                              rows="3"
                              value={settings.tickets.welcomeMessage || ''}
                              onChange={(e) => handleInputChange('tickets.welcomeMessage', e.target.value)}
                              className="glass-input"
                              placeholder="Click the button below to open a ticket. Our support team will help you shortly."
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Ticket Channel Welcome Message (Supports {`{user}`}, {`{server}`}, {`{category}`})</label>
                            <textarea 
                              rows="3"
                              value={settings.tickets.ticketMessage || ''}
                              onChange={(e) => handleInputChange('tickets.ticketMessage', e.target.value)}
                              className="glass-input"
                              placeholder="Welcome {user}! Please describe your issue. Support staff will assist you shortly."
                            />
                          </div>

                          {/* ─── Ticket Categories Manager ─── */}
                          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                              <div>
                                <h4 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '2px' }}>Ticket Categories</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                  {ticketCategories.length >= 2
                                    ? `${ticketCategories.length} categories configured — a select menu dropdown will be used.`
                                    : ticketCategories.length === 1
                                      ? '1 category configured — add at least 2 to enable the dropdown select menu.'
                                      : 'No categories configured — the simple button will be used. Add 2+ categories to enable a dropdown menu.'}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={handleNewCategory}
                                className="btn-success"
                                style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                              >
                                <Plus size={14} /> Add Category
                              </button>
                            </div>

                            {/* Category Cards */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {ticketCategories.map((cat, idx) => (
                                <div key={cat.id || idx} style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                  padding: '12px 16px',
                                  borderRadius: '10px',
                                  background: 'rgba(255,255,255,0.03)',
                                  border: '1px solid var(--border-color)',
                                  transition: 'border-color 0.2s',
                                }}>
                                  {/* Emoji Preview */}
                                  <span style={{ fontSize: '1.5rem', width: '36px', textAlign: 'center', flexShrink: 0 }}>
                                    {cat.emoji && cat.emoji.match(/<a?:[^:]+:(\d+)>/) ? (
                                      <img 
                                        src={`https://cdn.discordapp.com/emojis/${cat.emoji.match(/<a?:[^:]+:(\d+)>/)[1]}.${cat.emoji.startsWith('<a:') ? 'gif' : 'png'}?size=32`}
                                        alt="" 
                                        style={{ width: '28px', height: '28px', verticalAlign: 'middle' }}
                                      />
                                    ) : (cat.emoji || '🎫')}
                                  </span>

                                  {/* Info */}
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{cat.label}</div>
                                    {cat.description && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.description}</div>}
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Prefix: <code>{cat.channelPrefix || cat.id}</code></div>
                                  </div>

                                  {/* Actions */}
                                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                                    <button 
                                      type="button"
                                      onClick={() => handleEditCategory(cat)}
                                      style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                    >
                                      <Edit3 size={12} /> Edit
                                    </button>
                                    <button 
                                      type="button"
                                      onClick={() => handleDeleteCategory(cat.id)}
                                      style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                    >
                                      <Trash2 size={12} /> Delete
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Category Add/Edit Form */}
                            {showCategoryForm && editingCategory && (
                              <div style={{
                                marginTop: '12px',
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'rgba(59,130,246,0.05)',
                                border: '1px solid rgba(59,130,246,0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                              }}>
                                <h5 style={{ fontWeight: '700', fontSize: '0.9rem', margin: 0, color: '#60a5fa' }}>
                                  {editingCategory.id && ticketCategories.some(c => c.id === editingCategory.id) ? 'Edit Category' : 'New Category'}
                                </h5>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Label *</label>
                                    <input 
                                      type="text"
                                      value={editingCategory.label}
                                      onChange={(e) => setEditingCategory(prev => ({ ...prev, label: e.target.value }))}
                                      className="glass-input"
                                      placeholder="e.g. General Support"
                                      style={{ fontSize: '0.85rem' }}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Channel Prefix</label>
                                    <input 
                                      type="text"
                                      value={editingCategory.channelPrefix}
                                      onChange={(e) => setEditingCategory(prev => ({ ...prev, channelPrefix: e.target.value }))}
                                      className="glass-input"
                                      placeholder="e.g. general"
                                      style={{ fontSize: '0.85rem' }}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Description (shown in dropdown)</label>
                                  <input 
                                    type="text"
                                    value={editingCategory.description}
                                    onChange={(e) => setEditingCategory(prev => ({ ...prev, description: e.target.value }))}
                                    className="glass-input"
                                    placeholder="e.g. Get general help from our team"
                                    maxLength={100}
                                    style={{ fontSize: '0.85rem' }}
                                  />
                                </div>

                                {/* Emoji Picker */}
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Emoji</label>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <button
                                      type="button"
                                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                      style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '10px',
                                        border: '2px solid var(--border-color)',
                                        background: 'rgba(255,255,255,0.05)',
                                        fontSize: '1.4rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'border-color 0.2s, transform 0.15s',
                                        flexShrink: 0
                                      }}
                                      onMouseEnter={(e) => { e.target.style.borderColor = '#60a5fa'; e.target.style.transform = 'scale(1.05)'; }}
                                      onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.transform = 'scale(1)'; }}
                                    >
                                      {editingCategory.emoji && editingCategory.emoji.match(/<a?:[^:]+:(\d+)>/) ? (
                                        <img 
                                          src={`https://cdn.discordapp.com/emojis/${editingCategory.emoji.match(/<a?:[^:]+:(\d+)>/)[1]}.${editingCategory.emoji.startsWith('<a:') ? 'gif' : 'png'}?size=32`}
                                          alt="" style={{ width: '28px', height: '28px' }}
                                        />
                                      ) : (editingCategory.emoji || '🎫')}
                                    </button>

                                    <input 
                                      type="text"
                                      value={editingCategory.emoji || ''}
                                      onChange={(e) => {
                                        let val = e.target.value.trim();
                                        if (/^\d{17,20}$/.test(val)) {
                                          val = `<:emoji:${val}>`;
                                        }
                                        setEditingCategory(prev => ({ ...prev, emoji: val }));
                                      }}
                                      className="glass-input"
                                      placeholder="e.g. 🎫 or <a:emoji:1535201693925507104>"
                                      style={{ fontSize: '0.85rem', flex: 1 }}
                                    />

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setShowEmojiPicker(!showEmojiPicker);
                                        if (!showEmojiPicker && serverEmojis.length > 0) {
                                          setEmojiPickerTab('server');
                                        }
                                      }}
                                      style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '6px', padding: '8px 12px', fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                                    >
                                      {showEmojiPicker ? 'Close Picker' : 'Pick Emoji'}
                                    </button>

                                    <label
                                      style={{
                                        background: 'rgba(16,185,129,0.15)',
                                        color: '#34d399',
                                        border: '1px solid rgba(16,185,129,0.3)',
                                        borderRadius: '6px',
                                        padding: '8px 12px',
                                        fontSize: '0.8rem',
                                        cursor: uploadingEmoji ? 'wait' : 'pointer',
                                        whiteSpace: 'nowrap',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        margin: 0
                                      }}
                                    >
                                      <input 
                                        type="file"
                                        accept="image/png,image/gif,image/jpeg,image/webp"
                                        style={{ display: 'none' }}
                                        disabled={uploadingEmoji}
                                        onChange={async (e) => {
                                          const file = e.target.files?.[0];
                                          if (!file) return;
                                          setUploadingEmoji(true);
                                          setErrorMsg(null);
                                          try {
                                            const res = await api.uploadEmoji(guildId, file);
                                            if (res.emoji) {
                                              setServerEmojis(prev => [res.emoji, ...prev]);
                                              setEditingCategory(prev => ({ ...prev, emoji: res.emoji.identifier }));
                                              setSuccessMsg(res.message || 'Emoji uploaded to Discord!');
                                              setShowEmojiPicker(false);
                                            }
                                          } catch (err) {
                                            console.error(err);
                                            setErrorMsg(err.message || 'Failed to upload emoji to Discord.');
                                          } finally {
                                            setUploadingEmoji(false);
                                            e.target.value = '';
                                          }
                                        }}
                                      />
                                      {uploadingEmoji ? 'Uploading...' : '📤 Upload Custom Emoji'}
                                    </label>
                                  </div>

                                  {/* Emoji Picker Dropdown */}
                                  {showEmojiPicker && (
                                    <div style={{
                                      marginTop: '8px',
                                      padding: '12px',
                                      borderRadius: '10px',
                                      background: 'rgba(0,0,0,0.4)',
                                      border: '1px solid var(--border-color)',
                                      maxHeight: '260px',
                                      overflow: 'hidden',
                                      display: 'flex',
                                      flexDirection: 'column'
                                    }}>
                                      {/* Tabs */}
                                      <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                                        <button
                                          type="button"
                                          onClick={() => setEmojiPickerTab('server')}
                                          style={{
                                            flex: 1,
                                            padding: '6px 10px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            background: emojiPickerTab === 'server' ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)',
                                            color: emojiPickerTab === 'server' ? '#60a5fa' : 'var(--text-secondary)',
                                            transition: 'all 0.15s'
                                          }}
                                        >
                                          ✨ Custom / Bot Emojis {serverEmojis.length > 0 && `(${serverEmojis.length})`}
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setEmojiPickerTab('unicode')}
                                          style={{
                                            flex: 1,
                                            padding: '6px 10px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            background: emojiPickerTab === 'unicode' ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)',
                                            color: emojiPickerTab === 'unicode' ? '#60a5fa' : 'var(--text-secondary)',
                                            transition: 'all 0.15s'
                                          }}
                                        >
                                          😀 Standard Unicode
                                        </button>
                                      </div>

                                      {/* Emoji Grid */}
                                      <div style={{ overflowY: 'auto', flex: 1, maxHeight: '190px' }}>
                                        {emojiPickerTab === 'unicode' && (
                                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))', gap: '4px' }}>
                                            {unicodeEmojis.map((em, i) => (
                                              <button
                                                key={i}
                                                type="button"
                                                onClick={() => {
                                                  setEditingCategory(prev => ({ ...prev, emoji: em }));
                                                  setShowEmojiPicker(false);
                                                }}
                                                style={{
                                                  width: '36px',
                                                  height: '36px',
                                                  borderRadius: '6px',
                                                  border: editingCategory.emoji === em ? '2px solid #60a5fa' : '1px solid transparent',
                                                  background: editingCategory.emoji === em ? 'rgba(59,130,246,0.15)' : 'transparent',
                                                  fontSize: '1.2rem',
                                                  cursor: 'pointer',
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                  transition: 'all 0.12s'
                                                }}
                                                onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.transform = 'scale(1.15)'; }}
                                                onMouseLeave={(e) => { e.target.style.background = editingCategory.emoji === em ? 'rgba(59,130,246,0.15)' : 'transparent'; e.target.style.transform = 'scale(1)'; }}
                                              >
                                                {em}
                                              </button>
                                            ))}
                                          </div>
                                        )}

                                        {emojiPickerTab === 'server' && (
                                          <div>
                                            {serverEmojis.length === 0 ? (
                                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>No custom emojis found on this server or bot application.</p>
                                            ) : (
                                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: '4px' }}>
                                                {serverEmojis.map(em => {
                                                  const isSelected = editingCategory.emoji === em.identifier;
                                                  return (
                                                    <button
                                                      key={em.id}
                                                      type="button"
                                                      title={`:${em.name}: (${em.source || 'Custom'}) ${em.animated ? '[animated]' : ''}`}
                                                      onClick={() => {
                                                        setEditingCategory(prev => ({ ...prev, emoji: em.identifier }));
                                                        setShowEmojiPicker(false);
                                                      }}
                                                      style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '6px',
                                                        border: isSelected ? '2px solid #60a5fa' : '1px solid transparent',
                                                        background: isSelected ? 'rgba(59,130,246,0.15)' : 'transparent',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.12s',
                                                        position: 'relative'
                                                      }}
                                                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                                                      onMouseLeave={(e) => { e.currentTarget.style.background = isSelected ? 'rgba(59,130,246,0.15)' : 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
                                                    >
                                                      <img 
                                                        src={em.url} 
                                                        alt={em.name} 
                                                        style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                                                      />
                                                      {em.animated && (
                                                        <span style={{
                                                          position: 'absolute',
                                                          bottom: '1px',
                                                          right: '1px',
                                                          background: '#5865f2',
                                                          color: '#fff',
                                                          fontSize: '0.5rem',
                                                          fontWeight: 'bold',
                                                          padding: '0px 3px',
                                                          borderRadius: '3px',
                                                          lineHeight: '1.3'
                                                        }}>GIF</span>
                                                      )}
                                                    </button>
                                                  );
                                                })}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Save / Cancel */}
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                  <button
                                    type="button"
                                    onClick={() => { setShowCategoryForm(false); setEditingCategory(null); setShowEmojiPicker(false); }}
                                    style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleSaveCategory}
                                    disabled={!editingCategory.label}
                                    className="btn-success"
                                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                                  >
                                    {editingCategory.id && ticketCategories.some(c => c.id === editingCategory.id) ? 'Update Category' : 'Add Category'}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                            <div>
                              <h4 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '2px' }}>Publish Panel to Discord</h4>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {useSelectMenu 
                                  ? 'Send the support ticket panel with a category dropdown menu to the selected channel.'
                                  : 'Send the support ticket box with the interactive button directly to the selected channel.'}
                              </p>
                            </div>
                            <button 
                              type="button"
                              onClick={handlePublishTickets} 
                              disabled={saving || !settings.tickets.channelId}
                              className="btn-success"
                              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                            >
                              Publish Embed
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Live Discord Preview */}
                    <div style={{ 
                      flex: '1 0 350px',
                      maxWidth: '520px',
                      position: 'sticky', 
                      top: '24px', 
                      zIndex: 10,
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '12px' 
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        <Eye size={14} />
                        Live Discord Preview
                      </span>
                      {settings.tickets?.enabled && (
                        <>
                          <DiscordMessagePreview 
                            botUser={{ username: user?.username }}
                            guildName={guildName}
                            guildIcon={guildIcon}
                            message=""
                            buttonEnabled={!useSelectMenu}
                            buttonLabel={!useSelectMenu ? (settings.tickets.buttonText || 'Create Ticket') : ''}
                            buttonUrl=""
                            embedEnabled={true}
                            embedTitle={settings.tickets.title || 'Support Ticket'}
                            embedDesc={settings.tickets.welcomeMessage || (useSelectMenu
                              ? 'Select a category below to open a ticket. Our support team will help you shortly.'
                              : 'Click the button below to open a ticket. Our support team will help you shortly.')}
                            embedColor="#2563eb"
                            embedThumb=""
                            embedImage=""
                            isDM={false}
                          />

                          {/* Select Menu Preview */}
                          {useSelectMenu && (
                            <div style={{
                              marginTop: '-8px',
                              padding: '8px 12px',
                              background: 'rgba(0,0,0,0.2)',
                              borderRadius: '8px',
                              border: '1px solid var(--border-color)'
                            }}>
                              <div style={{
                                background: '#1e1f22',
                                border: '1px solid #3f4147',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'default'
                              }}>
                                <span style={{ color: '#949ba4', fontSize: '0.875rem' }}>
                                  {settings.tickets.buttonText || '🎫 Select a ticket category...'}
                                </span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#949ba4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                              </div>
                              <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {ticketCategories.slice(0, 5).map((cat, i) => (
                                  <div key={cat.id || i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '6px 10px',
                                    borderRadius: '3px',
                                    background: i === 0 ? 'rgba(88,101,242,0.15)' : 'transparent',
                                    cursor: 'default'
                                  }}>
                                    <span style={{ fontSize: '1rem', width: '20px', textAlign: 'center', flexShrink: 0 }}>
                                      {cat.emoji && cat.emoji.match(/<a?:[^:]+:(\d+)>/) ? (
                                        <img 
                                          src={`https://cdn.discordapp.com/emojis/${cat.emoji.match(/<a?:[^:]+:(\d+)>/)[1]}.${cat.emoji.startsWith('<a:') ? 'gif' : 'png'}?size=20`}
                                          alt="" style={{ width: '18px', height: '18px', verticalAlign: 'middle' }}
                                        />
                                      ) : (cat.emoji || '🎫')}
                                    </span>
                                    <div>
                                      <div style={{ fontSize: '0.85rem', color: '#dbdee1', fontWeight: '500' }}>{cat.label}</div>
                                      {cat.description && <div style={{ fontSize: '0.7rem', color: '#949ba4' }}>{cat.description}</div>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                );
              })()}

              {/* TAB 5: ROLES & NICKNAMES */}
              {activeTab === 'roles' && (
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>Roles & Nicknames</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Automatically assign roles and structure nickname formatting when members join your server.</p>

                  {/* Auto Role Card */}
                  <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Auto Role on Join</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Automatically assigns a specific role as soon as a user joins the server.</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.autoRole.enabled} 
                          onChange={() => handleToggle('autoRole.enabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {settings.autoRole.enabled && (
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Role to Auto-Assign</label>
                        <select 
                          value={settings.autoRole.roleId}
                          onChange={(e) => handleInputChange('autoRole.roleId', e.target.value)}
                          className="glass-input"
                          style={{ maxWidth: '300px' }}
                        >
                          <option value="">-- Select Role --</option>
                          {roles.map(role => (
                            <option key={role.id} value={role.id} style={{ color: role.color }}>{role.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Auto Nickname Card */}
                  <div className="glass-panel" style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Auto Nickname Formatter</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Automatically renames new users matching your server nickname format guidelines.</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.autoNickname.enabled} 
                          onChange={() => handleToggle('autoNickname.enabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {settings.autoNickname.enabled && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 'bold' }}>Nickname Template</label>
                          <input 
                            type="text" 
                            value={settings.autoNickname.template !== undefined ? settings.autoNickname.template : (settings.autoNickname.format || '{DISPLAY_NAME}')}
                            onChange={(e) => {
                              handleInputChange('autoNickname.template', e.target.value);
                              handleInputChange('autoNickname.format', e.target.value); // Sync to format for backward compatibility
                            }}
                            className="glass-input"
                            style={{ maxWidth: '400px' }}
                            placeholder="{DISPLAY_NAME}"
                          />
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            Use <code>{`{USERNAME}`}</code> or <code>{`{DISPLAY_NAME}`}</code> as placeholders. They will be replaced with each user's chosen source name.
                          </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '600px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 'bold' }}>Source Name</label>
                            <select 
                              value={settings.autoNickname.sourceName || 'displayName'} 
                              onChange={(e) => handleInputChange('autoNickname.sourceName', e.target.value)}
                              className="glass-input"
                              style={{ width: '100%', cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', color: '#ffffff' }}
                            >
                              <option value="displayName">Display Name (Nickname)</option>
                              <option value="username">Username</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 'bold' }}>Capitalization Options</label>
                            <select 
                              value={settings.autoNickname.casing || 'original'} 
                              onChange={(e) => handleInputChange('autoNickname.casing', e.target.value)}
                              className="glass-input"
                              style={{ width: '100%', cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', color: '#ffffff' }}
                            >
                              <option value="original">Keep Original (e.g. TimoXit)</option>
                              <option value="upper">UPPERCASE (e.g. TIMOXIT)</option>
                              <option value="lower">lowercase (e.g. timoxit)</option>
                            </select>
                          </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '12px 16px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', maxWidth: '600px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>Live Preview</span>
                          <span style={{ fontSize: '0.9rem', color: '#ffffff', fontFamily: 'monospace', backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
                            {(() => {
                              const t = settings.autoNickname.template !== undefined ? settings.autoNickname.template : (settings.autoNickname.format || '{DISPLAY_NAME}');
                              const s = settings.autoNickname.sourceName || 'displayName';
                              const c = settings.autoNickname.casing || 'original';
                              const nameSample = 'TimoXit';
                              let formatted = nameSample;
                              if (c === 'upper') formatted = nameSample.toUpperCase();
                              if (c === 'lower') formatted = nameSample.toLowerCase();
                              return t.replace(/\{username\}/gi, formatted).replace(/\{display_name\}/gi, formatted);
                            })()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: SERVER LOGS */}
              {activeTab === 'logs' && (
                <div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '550px', overflowY: 'auto', paddingRight: '6px' }}>
                    {logs.length === 0 ? (
                      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>No moderation logs available. Live monitoring is active.</p>
                      </div>
                    ) : (
                      logs.map((log, idx) => {
                        let badgeColor = 'var(--text-secondary)';
                        let badgeBg = 'rgba(255,255,255,0.05)';
                        let actionLabel = (log.actionType || 'action').toUpperCase();

                        if (log.actionType === 'timeout') {
                          badgeColor = 'var(--warning)';
                          badgeBg = 'rgba(251, 191, 36, 0.1)';
                        } else if (log.actionType === 'ban') {
                          badgeColor = 'var(--danger)';
                          badgeBg = 'rgba(244, 63, 94, 0.1)';
                        } else if (log.actionType === 'kick') {
                          badgeColor = '#f97316';
                          badgeBg = 'rgba(249, 115, 22, 0.1)';
                        } else if (log.actionType === 'warn') {
                          badgeColor = '#fbbf24';
                          badgeBg = 'rgba(251, 191, 36, 0.1)';
                        } else if (log.actionType === 'message_delete') {
                          badgeColor = '#3b82f6';
                          badgeBg = 'rgba(59, 130, 246, 0.1)';
                          actionLabel = 'DELETE';
                        } else if (log.actionType === 'role_update') {
                          badgeColor = 'var(--secondary)';
                          badgeBg = 'rgba(6, 182, 212, 0.1)';
                          actionLabel = 'ROLES';
                        }

                        const modAvatar = (log.moderator && log.moderator.avatar && log.moderator.id)
                          ? `https://cdn.discordapp.com/avatars/${log.moderator.id}/${log.moderator.avatar}.png`
                          : 'https://cdn.discordapp.com/embed/avatars/0.png';
                        
                        const targetAvatar = (log.target && log.target.avatar && log.target.id)
                          ? `https://cdn.discordapp.com/avatars/${log.target.id}/${log.target.avatar}.png`
                          : 'https://cdn.discordapp.com/embed/avatars/0.png';

                        return (
                          <div 
                            key={log._id || idx} 
                            className="glass-panel" 
                            style={{ 
                              padding: '14px 18px', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              gap: '16px',
                              backgroundColor: 'rgba(255,255,255,0.01)',
                              borderLeft: `4px solid ${badgeColor}`,
                              flexShrink: 0
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '54px', height: '32px', flexShrink: 0 }}>
                                <img 
                                  src={modAvatar} 
                                  alt="Mod" 
                                  title={`Moderator: ${log.moderator?.username || 'Unknown Moderator'}`}
                                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid var(--border-color)', position: 'absolute', left: 0, zIndex: 2 }}
                                />
                                <img 
                                  src={targetAvatar} 
                                  alt="User" 
                                  title={`User: ${log.target?.username || 'Unknown User'}`}
                                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid var(--primary)', position: 'absolute', left: '18px', zIndex: 1 }}
                                />
                              </div>

                              <div style={{ flexGrow: 1 }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                                  <span style={{ color: 'var(--text-primary)' }}>{log.moderator?.username || 'Unknown Moderator'}</span>
                                  <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}> performed action on </span>
                                  <span style={{ color: 'var(--primary)' }}>{log.target?.username || 'Unknown User'}</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                  {log.details}
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                              <span style={{ 
                                fontSize: '0.65rem', 
                                fontWeight: '700', 
                                padding: '2px 8px', 
                                borderRadius: '10px',
                                color: badgeColor,
                                backgroundColor: badgeBg,
                                border: `1px solid ${badgeColor}22`
                              }}>
                                {actionLabel}
                              </span>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                {log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Unknown Time'}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
               {/* TAB 7: BROADCAST DMS */}
              {activeTab === 'broadcast' && (
                <div>

                  <div className="preview-layout-container">
                    {/* Left Column: Form Controls */}
                    <div className="glass-panel" style={{ 
                      flex: '1 1 500px',
                      padding: '24px', 
                      backgroundColor: 'rgba(255,255,255,0.01)', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '20px' 
                    }}>
                      


                      {/* Message Textarea */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Message Content</label>
                        <textarea 
                          rows="4" 
                          value={broadcastMessage} 
                          onChange={(e) => setBroadcastMessage(e.target.value)}
                          maxLength={2000}
                          className="glass-input"
                          placeholder="Hello {username}! Check out our new bot features..."
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Placeholders: Use <code>{`{username}`}</code> to name/mention the member, and <code>{`{server}`}</code> to insert the server name.
                          </span>
                          <span style={{ fontSize: '0.75rem', color: broadcastMessage.length >= 1900 ? 'var(--danger)' : 'var(--text-muted)' }}>
                            {broadcastMessage.length} / 2000
                          </span>
                        </div>
                      </div>

                      {/* Multiple Link Buttons Settings panel */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: broadcastButtons.length > 0 ? '16px' : '0' }}>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Attach Link Buttons (Up to 3)</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Adds clickable link buttons at the bottom of the message.</p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              if (broadcastButtons.length < 3) {
                                setBroadcastButtons([...broadcastButtons, { label: '', url: '' }]);
                              }
                            }}
                            disabled={broadcastButtons.length >= 3}
                            className="btn-success"
                            style={{ padding: '4px 10px', fontSize: '0.8rem', opacity: broadcastButtons.length >= 3 ? 0.5 : 1, cursor: broadcastButtons.length >= 3 ? 'not-allowed' : 'pointer' }}
                          >
                            + Add Button
                          </button>
                        </div>

                        {broadcastButtons.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {broadcastButtons.map((btn, idx) => (
                              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', backgroundColor: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ flex: 1 }}>
                                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Button {idx + 1} Label</label>
                                  <input 
                                    type="text" 
                                    value={btn.label}
                                    onChange={(e) => {
                                      const updated = [...broadcastButtons];
                                      updated[idx].label = e.target.value;
                                      setBroadcastButtons(updated);
                                    }}
                                    className="glass-input" 
                                    placeholder="e.g. Website"
                                  />
                                </div>
                                <div style={{ flex: 2 }}>
                                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Button {idx + 1} URL</label>
                                  <input 
                                    type="text" 
                                    value={btn.url}
                                    onChange={(e) => {
                                      const updated = [...broadcastButtons];
                                      updated[idx].url = e.target.value;
                                      setBroadcastButtons(updated);
                                    }}
                                    className="glass-input" 
                                    placeholder="e.g. https://website.com"
                                  />
                                </div>
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    setBroadcastButtons(broadcastButtons.filter((_, i) => i !== idx));
                                  }}
                                  className="btn-danger"
                                  style={{ padding: '8px 12px', fontSize: '0.85rem', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Legacy fallback toggle to show one single button if none are explicitly in the array */
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Quick Button Toggle</span>
                              <label className="switch">
                                <input 
                                  type="checkbox" 
                                  checked={broadcastButtonEnabled} 
                                  onChange={(e) => setBroadcastButtonEnabled(e.target.checked)}
                                />
                                <span className="slider"></span>
                              </label>
                            </div>
                            {broadcastButtonEnabled && (
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '12px' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Button Label</label>
                                  <input 
                                    type="text" 
                                    value={broadcastButtonLabel}
                                    onChange={(e) => setBroadcastButtonLabel(e.target.value)}
                                    className="glass-input" 
                                    placeholder="e.g. Visit Website"
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Button URL</label>
                                  <input 
                                    type="text" 
                                    value={broadcastButtonUrl}
                                    onChange={(e) => setBroadcastButtonUrl(e.target.value)}
                                    className="glass-input" 
                                    placeholder="e.g. https://website.com"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Embed Builder sub-panel */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: broadcastEmbedEnabled ? '16px' : '0' }}>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Attach Rich Embed</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Creates a beautifully styled embed card with custom color, title, and media links.</p>
                          </div>
                          <label className="switch">
                            <input 
                              type="checkbox" 
                              checked={broadcastEmbedEnabled} 
                              onChange={(e) => setBroadcastEmbedEnabled(e.target.checked)}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        {broadcastEmbedEnabled && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Author Customization */}
                            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Customize Embed Author</span>
                                <label className="switch" style={{ width: '40px', height: '20px' }}>
                                  <input 
                                    type="checkbox" 
                                    checked={broadcastEmbedAuthorEnabled} 
                                    onChange={(e) => setBroadcastEmbedAuthorEnabled(e.target.checked)}
                                  />
                                  <span className="slider" style={{ borderRadius: '20px' }}></span>
                                </label>
                              </div>
                              {broadcastEmbedAuthorEnabled && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Author Name</label>
                                      <input 
                                        type="text" 
                                        value={broadcastEmbedAuthorName}
                                        onChange={(e) => setBroadcastEmbedAuthorName(e.target.value)}
                                        className="glass-input" 
                                        placeholder="e.g. Server Owner"
                                      />
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Author Icon URL</label>
                                      <input 
                                        type="text" 
                                        value={broadcastEmbedAuthorIcon}
                                        onChange={(e) => setBroadcastEmbedAuthorIcon(e.target.value)}
                                        className="glass-input" 
                                        placeholder="https://example.com/icon.png"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Author Click URL</label>
                                    <input 
                                      type="text" 
                                      value={broadcastEmbedAuthorUrl}
                                      onChange={(e) => setBroadcastEmbedAuthorUrl(e.target.value)}
                                      className="glass-input" 
                                      placeholder="https://example.com"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Embed Title & Sidebar Color */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Embed Title</label>
                                <input 
                                  type="text" 
                                  value={broadcastEmbedTitle}
                                  onChange={(e) => setBroadcastEmbedTitle(e.target.value)}
                                  className="glass-input" 
                                  placeholder="Embed Title"
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Sidebar Color</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <input 
                                    type="color" 
                                    value={broadcastEmbedColor}
                                    onChange={(e) => setBroadcastEmbedColor(e.target.value)}
                                    style={{ width: '40px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', background: 'none' }}
                                  />
                                  <input 
                                    type="text" 
                                    value={broadcastEmbedColor}
                                    onChange={(e) => setBroadcastEmbedColor(e.target.value)}
                                    className="glass-input" 
                                    placeholder="#2563eb"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Embed Description */}
                            <div>
                              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Embed Description</label>
                              <textarea 
                                rows="3" 
                                value={broadcastEmbedDesc}
                                onChange={(e) => setBroadcastEmbedDesc(e.target.value)}
                                maxLength={4000}
                                className="glass-input" 
                                placeholder="Rich description..."
                              />
                              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
                                <span style={{ fontSize: '0.7rem', color: broadcastEmbedDesc.length >= 3800 ? 'var(--danger)' : 'var(--text-muted)' }}>
                                  {broadcastEmbedDesc.length} / 4000
                                </span>
                              </div>
                            </div>

                            {/* Embed Fields Section */}
                            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Embed Fields (Up to 5)</span>
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    if (broadcastEmbedFields.length < 5) {
                                      setBroadcastEmbedFields([...broadcastEmbedFields, { name: '', value: '', inline: true }]);
                                    }
                                  }} 
                                  disabled={broadcastEmbedFields.length >= 5}
                                  className="btn-primary"
                                  style={{ padding: '4px 10px', fontSize: '0.8rem', opacity: broadcastEmbedFields.length >= 5 ? 0.5 : 1, cursor: broadcastEmbedFields.length >= 5 ? 'not-allowed' : 'pointer' }}
                                >
                                  + Add Field
                                </button>
                              </div>
                              
                              {broadcastEmbedFields.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                                  {broadcastEmbedFields.map((fld, idx) => (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)' }}>Field #{idx + 1}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                            <input 
                                              type="checkbox" 
                                              checked={fld.inline} 
                                              onChange={(e) => {
                                                const updated = [...broadcastEmbedFields];
                                                updated[idx].inline = e.target.checked;
                                                setBroadcastEmbedFields(updated);
                                              }}
                                              style={{ cursor: 'pointer' }}
                                            />
                                            Inline Grid Layout
                                          </label>
                                          <button 
                                            type="button" 
                                            onClick={() => {
                                              setBroadcastEmbedFields(broadcastEmbedFields.filter((_, i) => i !== idx));
                                            }}
                                            className="btn-danger"
                                            style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px' }}
                                          >
                                            <Trash2 size={12} />
                                          </button>
                                        </div>
                                      </div>
                                      
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                                        <div>
                                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Field Name</label>
                                          <input 
                                            type="text" 
                                            value={fld.name}
                                            onChange={(e) => {
                                              const updated = [...broadcastEmbedFields];
                                              updated[idx].name = e.target.value;
                                              setBroadcastEmbedFields(updated);
                                            }}
                                            className="glass-input" 
                                            placeholder="Field Title"
                                          />
                                        </div>
                                        <div>
                                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Field Value</label>
                                          <textarea 
                                            rows="1" 
                                            value={fld.value}
                                            onChange={(e) => {
                                              const updated = [...broadcastEmbedFields];
                                              updated[idx].value = e.target.value;
                                              setBroadcastEmbedFields(updated);
                                            }}
                                            className="glass-input" 
                                            placeholder="Field Content"
                                            style={{ minHeight: '38px', resize: 'vertical' }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Embed Thumbnail & Image */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Thumbnail URL</label>
                                <input 
                                  type="text" 
                                  value={broadcastEmbedThumb}
                                  onChange={(e) => setBroadcastEmbedThumb(e.target.value)}
                                  className="glass-input" 
                                  placeholder="https://example.com/thumbnail.png"
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Large Image URL</label>
                                <input 
                                  type="text" 
                                  value={broadcastEmbedImage}
                                  onChange={(e) => setBroadcastEmbedImage(e.target.value)}
                                  className="glass-input" 
                                  placeholder="https://example.com/banner.png"
                                />
                              </div>
                            </div>

                            {/* Footer Customization */}
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Customize Embed Footer</span>
                                <label className="switch" style={{ width: '40px', height: '20px' }}>
                                  <input 
                                    type="checkbox" 
                                    checked={broadcastEmbedFooterEnabled} 
                                    onChange={(e) => setBroadcastEmbedFooterEnabled(e.target.checked)}
                                  />
                                  <span className="slider" style={{ borderRadius: '20px' }}></span>
                                </label>
                              </div>
                              {broadcastEmbedFooterEnabled && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '8px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Footer Text</label>
                                    <input 
                                      type="text" 
                                      value={broadcastEmbedFooterText}
                                      onChange={(e) => setBroadcastEmbedFooterText(e.target.value)}
                                      className="glass-input" 
                                      placeholder="Footer Text"
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Footer Icon URL</label>
                                    <input 
                                      type="text" 
                                      value={broadcastEmbedFooterIcon}
                                      onChange={(e) => setBroadcastEmbedFooterIcon(e.target.value)}
                                      className="glass-input" 
                                      placeholder="https://example.com/footer-icon.png"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Template Manager Section */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '0 0 12px 0' }}>Save or Load Templates</h4>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '16px' }}>
                          <div style={{ flex: 1 }}>
                            <input 
                              type="text" 
                              value={templateName}
                              onChange={(e) => setTemplateName(e.target.value)}
                              className="glass-input" 
                              placeholder="Template Name (e.g. Promo DM)"
                            />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => {
                              if (templateName.trim()) {
                                handleSaveTemplate(templateName, 'dm');
                                setTemplateName('');
                              }
                            }}
                            className="btn-success"
                            style={{ height: '40px', padding: '0 16px', fontSize: '0.85rem' }}
                          >
                            Save Draft
                          </button>
                        </div>

                        {templates.length > 0 && (
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Saved DM Templates</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {templates.map(tpl => (
                                <div key={tpl._id} className="badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                  <span 
                                    onClick={() => handleLoadTemplate(tpl)} 
                                    style={{ cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' }}
                                  >
                                    {tpl.name}
                                  </span>
                                  <Trash2 
                                    size={12} 
                                    style={{ color: 'var(--danger)', cursor: 'pointer' }} 
                                    onClick={() => handleDeleteTemplate(tpl._id, 'dm')}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Delivery & Scheduling Settings */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '0 0 12px 0', color: '#ffffff' }}>Delivery & Scheduling Settings</h4>
                        
                        {/* Delay Slider */}
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              Stagger Interval Delay: <strong style={{ color: 'var(--primary)' }}>{broadcastDelayInterval} second{broadcastDelayInterval !== 1 ? 's' : ''}</strong>
                            </label>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Protects against API rate limits</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            step="1"
                            value={broadcastDelayInterval} 
                            onChange={(e) => setBroadcastDelayInterval(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                          />
                        </div>

                        {/* Scheduling Toggle & Input */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: broadcastIsScheduled ? '12px' : '0' }}>
                            <div>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Schedule Broadcast for Later</span>
                              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>Queue this broadcast to run at a specific future date and time.</p>
                            </div>
                            <label className="switch">
                              <input 
                                type="checkbox" 
                                checked={broadcastIsScheduled} 
                                onChange={(e) => setBroadcastIsScheduled(e.target.checked)}
                              />
                              <span className="slider"></span>
                            </label>
                          </div>

                          {broadcastIsScheduled && (
                            <div style={{ marginTop: '12px' }}>
                              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Release Date & Time</label>
                              <input 
                                type="datetime-local" 
                                value={broadcastScheduledTime}
                                onChange={(e) => setBroadcastScheduledTime(e.target.value)}
                                className="glass-input" 
                                style={{ colorScheme: 'dark' }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Mass DM Warning Banner */}
                      <div className="glass-panel" style={{ padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                        <h4 style={{ color: 'var(--danger)', fontSize: '0.9rem', fontWeight: '700', marginBottom: '4px' }}>⚠️ Mass DM rate limit & safety warning</h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                          The bot sends direct messages to members using a **{broadcastDelayInterval}-second interval** to protect your bot from getting flagged as spam. Please be patient while the broadcast runs in the background. 
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                        <button 
                          type="button" 
                          onClick={handleSendTestDM} 
                          disabled={broadcasting} 
                          className="btn-secondary"
                          style={{ gap: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '42px', padding: '0 16px', fontSize: '0.85rem' }}
                        >
                          <Eye size={18} />
                          Send Test DM
                        </button>
                        <button 
                          type="button" 
                          onClick={handleSendBroadcast} 
                          disabled={broadcasting} 
                          className="btn-primary"
                          style={{ gap: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '42px', padding: '0 20px', fontSize: '0.85rem' }}
                        >
                          <Send size={18} />
                          {broadcasting ? 'Broadcasting DMs...' : (broadcastIsScheduled ? 'Schedule DM Broadcast' : 'Send DMs to Members')}
                        </button>
                      </div>

                      {/* Pending Scheduled DMs List */}
                      {scheduledDMs.length > 0 && (
                        <div className="glass-panel" style={{ padding: '16px', borderColor: 'var(--primary)', backgroundColor: 'rgba(59, 130, 246, 0.02)', marginTop: '20px' }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '0 0 12px 0', color: '#ffffff' }}>Pending Scheduled DMs ({scheduledDMs.length})</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {scheduledDMs.map(dm => {
                              return (
                                <div key={dm._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                                  <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '250px' }}>
                                      {dm.message || (dm.embed && dm.embed.title) || 'Embed Only DM'}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Publishing at {new Date(dm.publishAt).toLocaleString()}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Delay: {dm.delayInterval}s | Roles: Filter: {roles.find(r => r.id === dm.filterRole)?.name || 'None'} / Exclude: {roles.find(r => r.id === dm.excludeRole)?.name || 'None'}</div>
                                  </div>
                                  <button 
                                    type="button" 
                                    onClick={() => handleDeleteScheduledDM(dm._id)}
                                    className="btn-danger"
                                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}



                    </div>

                    {/* Right Column: Live Discord Preview */}
                    <div style={{ 
                      flex: '1 0 350px',
                      maxWidth: '520px',
                      position: 'sticky', 
                      top: '24px', 
                      zIndex: 10,
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '12px' 
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        <Eye size={14} />
                        Live Discord Preview
                      </span>
                      <DiscordMessagePreview 
                        botUser={{ username: user?.username }}
                        guildName={guildName}
                        guildIcon={guildIcon}
                        message={broadcastMessage}
                        buttonEnabled={broadcastButtonEnabled}
                        buttonLabel={broadcastButtonLabel}
                        buttonUrl={broadcastButtonUrl}
                        embedEnabled={broadcastEmbedEnabled}
                        embedTitle={broadcastEmbedTitle}
                        embedDesc={broadcastEmbedDesc}
                        embedColor={broadcastEmbedColor}
                        embedThumb={broadcastEmbedThumb}
                        embedImage={broadcastEmbedImage}
                        isDM={true}
                        embedAuthorEnabled={broadcastEmbedAuthorEnabled}
                        embedAuthorName={broadcastEmbedAuthorName}
                        embedAuthorIcon={broadcastEmbedAuthorIcon}
                        embedAuthorUrl={broadcastEmbedAuthorUrl}
                        embedFooterEnabled={broadcastEmbedFooterEnabled}
                        embedFooterText={broadcastEmbedFooterText}
                        embedFooterIcon={broadcastEmbedFooterIcon}
                        embedFields={broadcastEmbedFields}
                        buttons={broadcastButtons.length > 0 ? broadcastButtons : (broadcastButtonEnabled && broadcastButtonLabel && broadcastButtonUrl ? [{ label: broadcastButtonLabel, url: broadcastButtonUrl }] : [])}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: PUBLISH ANNOUNCEMENT */}
              {activeTab === 'publish' && (
                <div>

                  <div className="preview-layout-container">
                    {/* Left Column: Form Controls */}
                    <div className="glass-panel" style={{ 
                      flex: '1 1 500px',
                      padding: '24px', 
                      backgroundColor: 'rgba(255,255,255,0.01)', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '20px' 
                    }}>
                      
                      {/* Target Channel & Ping Target Row */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        {/* Target Channel Dropdown */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Select Target Channel</label>
                          <select 
                            value={pubChannelId}
                            onChange={(e) => setPubChannelId(e.target.value)}
                            className="glass-input"
                          >
                            <option value="">-- Select text channel --</option>
                            {channels.map(ch => (
                              <option key={ch.id} value={ch.id}>#{ch.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Ping Target Select */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Ping Target (Mentions)</label>
                          <select 
                            value={pubPingType}
                            onChange={(e) => setPubPingType(e.target.value)}
                            className="glass-input"
                          >
                            <option value="none">No Mention</option>
                            <option value="everyone">@everyone</option>
                            <option value="here">@here</option>
                            <option value="role">Specific Role...</option>
                          </select>
                        </div>
                      </div>

                      {/* Specific Role Dropdown */}
                      {pubPingType === 'role' && (
                        <div style={{ marginTop: '-4px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Select Role to Ping</label>
                          <select 
                            value={pubPingRoleId}
                            onChange={(e) => setPubPingRoleId(e.target.value)}
                            className="glass-input"
                          >
                            <option value="">-- Select server role --</option>
                            {roles.map(r => (
                              <option key={r.id} value={r.id} style={{ color: r.color }}>{r.name}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Message Textarea */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Message Content</label>
                        <textarea 
                          rows="4" 
                          value={pubMessage} 
                          onChange={(e) => setPubMessage(e.target.value)}
                          maxLength={2000}
                          className="glass-input"
                          placeholder="Type your channel message here..."
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Placeholders: Use <code>{`{server}`}</code> to insert the server name.
                          </span>
                          <span style={{ fontSize: '0.75rem', color: pubMessage.length >= 1900 ? 'var(--danger)' : 'var(--text-muted)' }}>
                            {pubMessage.length} / 2000
                          </span>
                        </div>
                      </div>

                      {/* Multiple Link Buttons Settings panel */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: pubButtons.length > 0 ? '16px' : '0' }}>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Attach Link Buttons (Up to 3)</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Adds clickable link buttons at the bottom of the message.</p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              if (pubButtons.length < 3) {
                                setPubButtons([...pubButtons, { label: '', url: '' }]);
                              }
                            }}
                            disabled={pubButtons.length >= 3}
                            className="btn-success"
                            style={{ padding: '4px 10px', fontSize: '0.8rem', opacity: pubButtons.length >= 3 ? 0.5 : 1, cursor: pubButtons.length >= 3 ? 'not-allowed' : 'pointer' }}
                          >
                            + Add Button
                          </button>
                        </div>

                        {pubButtons.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {pubButtons.map((btn, idx) => (
                              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', backgroundColor: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ flex: 1 }}>
                                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Button {idx + 1} Label</label>
                                  <input 
                                    type="text" 
                                    value={btn.label}
                                    onChange={(e) => {
                                      const updated = [...pubButtons];
                                      updated[idx].label = e.target.value;
                                      setPubButtons(updated);
                                    }}
                                    className="glass-input" 
                                    placeholder="e.g. Website"
                                  />
                                </div>
                                <div style={{ flex: 2 }}>
                                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Button {idx + 1} URL</label>
                                  <input 
                                    type="text" 
                                    value={btn.url}
                                    onChange={(e) => {
                                      const updated = [...pubButtons];
                                      updated[idx].url = e.target.value;
                                      setPubButtons(updated);
                                    }}
                                    className="glass-input" 
                                    placeholder="e.g. https://website.com"
                                  />
                                </div>
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    setPubButtons(pubButtons.filter((_, i) => i !== idx));
                                  }}
                                  className="btn-danger"
                                  style={{ padding: '8px 12px', fontSize: '0.85rem', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Legacy fallback toggle to show one single button if none are explicitly in the array */
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Quick Button Toggle</span>
                              <label className="switch">
                                <input 
                                  type="checkbox" 
                                  checked={pubButtonEnabled} 
                                  onChange={(e) => setPubButtonEnabled(e.target.checked)}
                                />
                                <span className="slider"></span>
                              </label>
                            </div>
                            {pubButtonEnabled && (
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '12px' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Button Label</label>
                                  <input 
                                    type="text" 
                                    value={pubButtonLabel}
                                    onChange={(e) => setPubButtonLabel(e.target.value)}
                                    className="glass-input" 
                                    placeholder="e.g. Visit Website"
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Button URL</label>
                                  <input 
                                    type="text" 
                                    value={pubButtonUrl}
                                    onChange={(e) => setPubButtonUrl(e.target.value)}
                                    className="glass-input" 
                                    placeholder="e.g. https://website.com"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Embed Builder sub-panel */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: pubEmbedEnabled ? '16px' : '0' }}>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Attach Rich Embed</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Creates a beautifully styled embed card with custom color, title, and media links.</p>
                          </div>
                          <label className="switch">
                            <input 
                              type="checkbox" 
                              checked={pubEmbedEnabled} 
                              onChange={(e) => setPubEmbedEnabled(e.target.checked)}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        {pubEmbedEnabled && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Author customization */}
                            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Customize Embed Author</span>
                                <label className="switch" style={{ width: '40px', height: '20px' }}>
                                  <input 
                                    type="checkbox" 
                                    checked={pubEmbedAuthorEnabled} 
                                    onChange={(e) => setPubEmbedAuthorEnabled(e.target.checked)}
                                  />
                                  <span className="slider" style={{ borderRadius: '20px' }}></span>
                                </label>
                              </div>
                              {pubEmbedAuthorEnabled && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Author Name</label>
                                      <input 
                                        type="text" 
                                        value={pubEmbedAuthorName}
                                        onChange={(e) => setPubEmbedAuthorName(e.target.value)}
                                        className="glass-input" 
                                        placeholder="e.g. Server Owner"
                                      />
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Author Icon URL</label>
                                      <input 
                                        type="text" 
                                        value={pubEmbedAuthorIcon}
                                        onChange={(e) => setPubEmbedAuthorIcon(e.target.value)}
                                        className="glass-input" 
                                        placeholder="https://example.com/icon.png"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Author Click URL</label>
                                    <input 
                                      type="text" 
                                      value={pubEmbedAuthorUrl}
                                      onChange={(e) => setPubEmbedAuthorUrl(e.target.value)}
                                      className="glass-input" 
                                      placeholder="https://example.com"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Embed Title & Color */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Embed Title</label>
                                <input 
                                  type="text" 
                                  value={pubEmbedTitle}
                                  onChange={(e) => setPubEmbedTitle(e.target.value)}
                                  className="glass-input" 
                                  placeholder="Embed Title"
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Sidebar Color</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <input 
                                    type="color" 
                                    value={pubEmbedColor}
                                    onChange={(e) => setPubEmbedColor(e.target.value)}
                                    style={{ width: '40px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', background: 'none' }}
                                  />
                                  <input 
                                    type="text" 
                                    value={pubEmbedColor}
                                    onChange={(e) => setPubEmbedColor(e.target.value)}
                                    className="glass-input" 
                                    placeholder="#2563eb"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Embed Description */}
                            <div>
                              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Embed Description</label>
                              <textarea 
                                rows="3" 
                                value={pubEmbedDesc}
                                onChange={(e) => setPubEmbedDesc(e.target.value)}
                                maxLength={4000}
                                className="glass-input" 
                                placeholder="Rich description..."
                              />
                              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
                                <span style={{ fontSize: '0.7rem', color: pubEmbedDesc.length >= 3800 ? 'var(--danger)' : 'var(--text-muted)' }}>
                                  {pubEmbedDesc.length} / 4000
                                </span>
                              </div>
                            </div>

                            {/* Embed Fields Section */}
                            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Embed Fields (Up to 5)</span>
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    if (pubEmbedFields.length < 5) {
                                      setPubEmbedFields([...pubEmbedFields, { name: '', value: '', inline: true }]);
                                    }
                                  }} 
                                  disabled={pubEmbedFields.length >= 5}
                                  className="btn-primary"
                                  style={{ padding: '4px 10px', fontSize: '0.8rem', opacity: pubEmbedFields.length >= 5 ? 0.5 : 1, cursor: pubEmbedFields.length >= 5 ? 'not-allowed' : 'pointer' }}
                                >
                                  + Add Field
                                </button>
                              </div>
                              
                              {pubEmbedFields.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                                  {pubEmbedFields.map((fld, idx) => (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)' }}>Field #{idx + 1}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                            <input 
                                              type="checkbox" 
                                              checked={fld.inline} 
                                              onChange={(e) => {
                                                const updated = [...pubEmbedFields];
                                                updated[idx].inline = e.target.checked;
                                                setPubEmbedFields(updated);
                                              }}
                                              style={{ cursor: 'pointer' }}
                                            />
                                            Inline Grid Layout
                                          </label>
                                          <button 
                                            type="button" 
                                            onClick={() => {
                                              setPubEmbedFields(pubEmbedFields.filter((_, i) => i !== idx));
                                            }}
                                            className="btn-danger"
                                            style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px' }}
                                          >
                                            <Trash2 size={12} />
                                          </button>
                                        </div>
                                      </div>
                                      
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                                        <div>
                                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Field Name</label>
                                          <input 
                                            type="text" 
                                            value={fld.name}
                                            onChange={(e) => {
                                              const updated = [...pubEmbedFields];
                                              updated[idx].name = e.target.value;
                                              setPubEmbedFields(updated);
                                            }}
                                            className="glass-input" 
                                            placeholder="Field Title (e.g. Server Rules)"
                                          />
                                        </div>
                                        <div>
                                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Field Value</label>
                                          <textarea 
                                            rows="1" 
                                            value={fld.value}
                                            onChange={(e) => {
                                              const updated = [...pubEmbedFields];
                                              updated[idx].value = e.target.value;
                                              setPubEmbedFields(updated);
                                            }}
                                            className="glass-input" 
                                            placeholder="Field Content"
                                            style={{ minHeight: '38px', resize: 'vertical' }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Embed Thumbnail & Image */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Thumbnail URL</label>
                                <input 
                                  type="text" 
                                  value={pubEmbedThumb}
                                  onChange={(e) => setPubEmbedThumb(e.target.value)}
                                  className="glass-input" 
                                  placeholder="https://example.com/thumbnail.png"
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Large Image / GIF URL</label>
                                <input 
                                  type="text" 
                                  value={pubEmbedImage}
                                  onChange={(e) => setPubEmbedImage(e.target.value)}
                                  className="glass-input" 
                                  placeholder="https://example.com/banner.png or GIF URL"
                                />
                              </div>
                            </div>

                            {/* Footer customization */}
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>Customize Embed Footer</span>
                                <label className="switch" style={{ width: '40px', height: '20px' }}>
                                  <input 
                                    type="checkbox" 
                                    checked={pubEmbedFooterEnabled} 
                                    onChange={(e) => setPubEmbedFooterEnabled(e.target.checked)}
                                  />
                                  <span className="slider" style={{ borderRadius: '20px' }}></span>
                                </label>
                              </div>
                              {pubEmbedFooterEnabled && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '8px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Footer Text</label>
                                    <input 
                                      type="text" 
                                      value={pubEmbedFooterText}
                                      onChange={(e) => setPubEmbedFooterText(e.target.value)}
                                      className="glass-input" 
                                      placeholder="Footer Text"
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Footer Icon URL</label>
                                    <input 
                                      type="text" 
                                      value={pubEmbedFooterIcon}
                                      onChange={(e) => setPubEmbedFooterIcon(e.target.value)}
                                      className="glass-input" 
                                      placeholder="https://example.com/footer-icon.png"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Template Manager Section */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '0 0 12px 0' }}>Save or Load Templates</h4>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '16px' }}>
                          <div style={{ flex: 1 }}>
                            <input 
                              type="text" 
                              value={templateName}
                              onChange={(e) => setTemplateName(e.target.value)}
                              className="glass-input" 
                              placeholder="Template Name (e.g. Rules Post)"
                            />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => {
                              if (templateName.trim()) {
                                handleSaveTemplate(templateName, 'announcement');
                                setTemplateName('');
                              }
                            }}
                            className="btn-success"
                            style={{ height: '40px', padding: '0 16px', fontSize: '0.85rem' }}
                          >
                            Save Draft
                          </button>
                        </div>

                        {templates.length > 0 && (
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Saved Announcement Templates</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {templates.map(tpl => (
                                <div key={tpl._id} className="badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                  <span 
                                    onClick={() => handleLoadTemplate(tpl)} 
                                    style={{ cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' }}
                                  >
                                    {tpl.name}
                                  </span>
                                  <Trash2 
                                    size={12} 
                                    style={{ color: 'var(--danger)', cursor: 'pointer' }} 
                                    onClick={() => handleDeleteTemplate(tpl._id, 'announcement')}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Scheduled Announcement Options */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isScheduled ? '16px' : '0' }}>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Schedule Publication</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Publish this announcement automatically at a future date & time.</p>
                          </div>
                          <label className="switch">
                            <input 
                              type="checkbox" 
                              checked={isScheduled} 
                              onChange={(e) => setIsScheduled(e.target.checked)}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        {isScheduled && (
                          <div style={{ marginTop: '12px' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Select Release Date & Time</label>
                            <input 
                              type="datetime-local" 
                              value={scheduledTime}
                              onChange={(e) => setScheduledTime(e.target.value)}
                              className="glass-input" 
                              style={{ width: '100%' }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Pending Scheduled Announcements List */}
                      {scheduledAnnouncements.length > 0 && (
                        <div className="glass-panel" style={{ padding: '16px', borderColor: 'var(--primary)', backgroundColor: 'rgba(59, 130, 246, 0.02)' }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '0 0 12px 0', color: '#ffffff' }}>Pending Scheduled Announcements ({scheduledAnnouncements.length})</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {scheduledAnnouncements.map(ann => {
                              const targetCh = channels.find(c => c.id === ann.channelId)?.name || 'unknown-channel';
                              return (
                                <div key={ann._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                                  <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>#{targetCh}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Publishing at {new Date(ann.publishAt).toLocaleString()}</div>
                                  </div>
                                  <button 
                                    type="button" 
                                    onClick={() => handleDeleteScheduledAnnouncement(ann._id)}
                                    className="btn-danger"
                                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                        <button 
                          type="button" 
                          onClick={handleSendChannelMessage} 
                          disabled={publishing} 
                          className="btn-primary"
                          style={{ gap: '10px' }}
                        >
                          <Send size={18} />
                          {publishing ? (isScheduled ? 'Scheduling...' : 'Publishing...') : (isScheduled ? 'Schedule Announcement' : 'Publish Announcement')}
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Live Discord Preview */}
                    <div style={{ 
                      flex: '1 0 350px',
                      maxWidth: '520px',
                      position: 'sticky', 
                      top: '24px', 
                      zIndex: 10,
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '12px' 
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        <Eye size={14} />
                        Live Discord Preview
                      </span>
                      <DiscordMessagePreview 
                        botUser={{ username: user?.username }}
                        guildName={guildName}
                        guildIcon={guildIcon}
                        message={pubMessage}
                        buttonEnabled={pubButtonEnabled}
                        buttonLabel={pubButtonLabel}
                        buttonUrl={pubButtonUrl}
                        embedEnabled={pubEmbedEnabled}
                        embedTitle={pubEmbedTitle}
                        embedDesc={pubEmbedDesc}
                        embedColor={pubEmbedColor}
                        embedThumb={pubEmbedThumb}
                        embedImage={pubEmbedImage}
                        isDM={false}
                        pingType={pubPingType}
                        pingRoleId={pubPingRoleId}
                        roles={roles}
                        embedAuthorEnabled={pubEmbedAuthorEnabled}
                        embedAuthorName={pubEmbedAuthorName}
                        embedAuthorIcon={pubEmbedAuthorIcon}
                        embedAuthorUrl={pubEmbedAuthorUrl}
                        embedFooterEnabled={pubEmbedFooterEnabled}
                        embedFooterText={pubEmbedFooterText}
                        embedFooterIcon={pubEmbedFooterIcon}
                        embedFields={pubEmbedFields}
                        buttons={pubButtons.length > 0 ? pubButtons : (pubButtonEnabled && pubButtonLabel && pubButtonUrl ? [{ label: pubButtonLabel, url: pubButtonUrl }] : [])}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: WEBHOOK ANNOUNCEMENT */}
              {activeTab === 'webhook-announcement' && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
                      <Webhook size={28} style={{ color: 'var(--primary)' }} />
                      Separate Webhook Announcement
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                      Publish fully customizable announcements under any custom name and avatar URL across text channels or external Webhooks.
                    </p>
                  </div>

                  <div className="preview-layout-container" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    
                    {/* Left Column: Webhook Customizer Controls */}
                    <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
                      
                      {/* Section 1: Webhook & Target Channel Setup */}
                      <div className="glass-panel" style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Radio size={18} style={{ color: 'var(--primary)' }} />
                          1. Webhook & Target Channel Setup
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {/* Delivery Method Toggle */}
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                              type="button"
                              onClick={() => setUseCustomWebhookUrl(false)}
                              className={!useCustomWebhookUrl ? 'btn-primary' : 'btn-secondary'}
                              style={{ flex: 1, padding: '8px', fontSize: '0.85rem', justifyContent: 'center' }}
                            >
                              Server Text Channel
                            </button>
                            <button
                              type="button"
                              onClick={() => setUseCustomWebhookUrl(true)}
                              className={useCustomWebhookUrl ? 'btn-primary' : 'btn-secondary'}
                              style={{ flex: 1, padding: '8px', fontSize: '0.85rem', justifyContent: 'center' }}
                            >
                              Direct Webhook URL
                            </button>
                          </div>

                          {!useCustomWebhookUrl ? (
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
                                Target Server Channel
                              </label>
                              <select
                                value={webhookChannelId}
                                onChange={(e) => setWebhookChannelId(e.target.value)}
                                className="glass-input"
                              >
                                <option value="">-- Select Channel --</option>
                                {channels.map(c => (
                                  <option key={c.id} value={c.id}>#{c.name}</option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
                                Custom Discord Webhook URL
                              </label>
                              <input
                                type="text"
                                value={customWebhookUrlInput}
                                onChange={(e) => setCustomWebhookUrlInput(e.target.value)}
                                className="glass-input"
                                placeholder="https://discord.com/api/webhooks/123456/abcdef..."
                              />
                            </div>
                          )}

                          {/* Custom Webhook Display Name */}
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
                              Custom Webhook Name
                            </label>
                            <input
                              type="text"
                              value={webhookDisplayName}
                              onChange={(e) => setWebhookDisplayName(e.target.value)}
                              className="glass-input"
                              placeholder={`e.g. ${guildName} Notifier`}
                            />
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                              The display username shown above the webhook message in Discord.
                            </span>
                          </div>

                          {/* Custom Webhook Avatar URL */}
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
                              Custom Webhook Avatar URL
                            </label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <input
                                type="text"
                                value={webhookDisplayAvatar}
                                onChange={(e) => setWebhookDisplayAvatar(e.target.value)}
                                className="glass-input"
                                placeholder="https://example.com/avatar.png"
                                style={{ flex: 1 }}
                              />
                              {webhookDisplayAvatar && (
                                <img
                                  src={webhookDisplayAvatar}
                                  alt="Preview"
                                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Message & Mention Configuration */}
                      <div className="glass-panel" style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MessageSquare size={18} style={{ color: 'var(--primary)' }} />
                          2. Message & Mention Configuration
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
                              Mention / Ping Type
                            </label>
                            <select
                              value={webhookPingType}
                              onChange={(e) => setWebhookPingType(e.target.value)}
                              className="glass-input"
                            >
                              <option value="none">No Mention</option>
                              <option value="everyone">@everyone</option>
                              <option value="here">@here</option>
                              <option value="role">Specific Role...</option>
                            </select>
                          </div>

                          {webhookPingType === 'role' && (
                            <div>
                              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
                                Select Role to Ping
                              </label>
                              <select
                                value={webhookPingRoleId}
                                onChange={(e) => setWebhookPingRoleId(e.target.value)}
                                className="glass-input"
                              >
                                <option value="">-- Select Role --</option>
                                {roles.map(r => (
                                  <option key={r.id} value={r.id} style={{ color: r.color }}>{r.name}</option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
                              Message Body Content
                            </label>
                            <textarea
                              rows="4"
                              value={webhookMessageContent}
                              onChange={(e) => setWebhookMessageContent(e.target.value)}
                              maxLength={2000}
                              className="glass-input"
                              placeholder="Type main announcement text here..."
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                Placeholders: Use <code>{`{server}`}</code> or <code>{`{username}`}</code>.
                              </span>
                              <span style={{ fontSize: '0.75rem', color: webhookMessageContent.length >= 1900 ? 'var(--danger)' : 'var(--text-muted)' }}>
                                {webhookMessageContent.length} / 2000
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Embed Customizer */}
                      <div className="glass-panel" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Layers size={18} style={{ color: 'var(--primary)' }} />
                            3. Rich Discord Embed Builder
                          </h3>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={webhookEmbedEnabled}
                              onChange={(e) => setWebhookEmbedEnabled(e.target.checked)}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        {webhookEmbedEnabled && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                            
                            {/* Embed Author */}
                            <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff' }}>Embed Author Header</span>
                                <label className="switch" style={{ width: '38px', height: '20px' }}>
                                  <input
                                    type="checkbox"
                                    checked={webhookAuthorEnabled}
                                    onChange={(e) => setWebhookAuthorEnabled(e.target.checked)}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>
                              {webhookAuthorEnabled && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '10px' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Author Name</label>
                                    <input
                                      type="text"
                                      value={webhookAuthorName}
                                      onChange={(e) => setWebhookAuthorName(e.target.value)}
                                      className="glass-input"
                                      placeholder="Author Name"
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Author Icon URL</label>
                                    <input
                                      type="text"
                                      value={webhookAuthorIcon}
                                      onChange={(e) => setWebhookAuthorIcon(e.target.value)}
                                      className="glass-input"
                                      placeholder="https://example.com/icon.png"
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Author Link URL</label>
                                    <input
                                      type="text"
                                      value={webhookAuthorUrl}
                                      onChange={(e) => setWebhookAuthorUrl(e.target.value)}
                                      className="glass-input"
                                      placeholder="https://example.com"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Title & Color */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Embed Title</label>
                                <input
                                  type="text"
                                  value={webhookEmbedTitle}
                                  onChange={(e) => setWebhookEmbedTitle(e.target.value)}
                                  className="glass-input"
                                  placeholder="Embed Header Title"
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Title Link URL</label>
                                <input
                                  type="text"
                                  value={webhookEmbedTitleUrl}
                                  onChange={(e) => setWebhookEmbedTitleUrl(e.target.value)}
                                  className="glass-input"
                                  placeholder="https://example.com"
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Sidebar Accent Color</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <input
                                    type="color"
                                    value={webhookEmbedColor}
                                    onChange={(e) => setWebhookEmbedColor(e.target.value)}
                                    style={{ width: '40px', height: '38px', padding: 0, border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', background: 'none' }}
                                  />
                                  <input
                                    type="text"
                                    value={webhookEmbedColor}
                                    onChange={(e) => setWebhookEmbedColor(e.target.value)}
                                    className="glass-input"
                                    placeholder="#2563eb"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Embed Description */}
                            <div>
                              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Embed Description</label>
                              <textarea
                                rows="3"
                                value={webhookEmbedDesc}
                                onChange={(e) => setWebhookEmbedDesc(e.target.value)}
                                maxLength={4000}
                                className="glass-input"
                                placeholder="Rich multi-line description..."
                              />
                            </div>

                            {/* Media URLs */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Thumbnail URL (Small Right)</label>
                                <input
                                  type="text"
                                  value={webhookThumbUrl}
                                  onChange={(e) => setWebhookThumbUrl(e.target.value)}
                                  className="glass-input"
                                  placeholder="https://example.com/thumb.png"
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Large Image URL (Banner)</label>
                                <input
                                  type="text"
                                  value={webhookImageUrl}
                                  onChange={(e) => setWebhookImageUrl(e.target.value)}
                                  className="glass-input"
                                  placeholder="https://example.com/banner.png"
                                />
                              </div>
                            </div>

                            {/* Dynamic Embed Fields */}
                            <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff' }}>Embed Fields ({webhookEmbedFields.length}/5)</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (webhookEmbedFields.length < 5) {
                                      setWebhookEmbedFields([...webhookEmbedFields, { name: '', value: '', inline: true }]);
                                    }
                                  }}
                                  disabled={webhookEmbedFields.length >= 5}
                                  className="btn-success"
                                  style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                                >
                                  + Add Field
                                </button>
                              </div>
                              {webhookEmbedFields.map((fld, idx) => (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <input
                                      type="text"
                                      value={fld.name}
                                      onChange={(e) => {
                                        const updated = [...webhookEmbedFields];
                                        updated[idx].name = e.target.value;
                                        setWebhookEmbedFields(updated);
                                      }}
                                      className="glass-input"
                                      placeholder="Field Title"
                                      style={{ flex: 1 }}
                                    />
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                      <input
                                        type="checkbox"
                                        checked={fld.inline}
                                        onChange={(e) => {
                                          const updated = [...webhookEmbedFields];
                                          updated[idx].inline = e.target.checked;
                                          setWebhookEmbedFields(updated);
                                        }}
                                      />
                                      Inline
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => setWebhookEmbedFields(webhookEmbedFields.filter((_, i) => i !== idx))}
                                      className="btn-danger"
                                      style={{ padding: '6px' }}
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                  <textarea
                                    rows="2"
                                    value={fld.value}
                                    onChange={(e) => {
                                      const updated = [...webhookEmbedFields];
                                      updated[idx].value = e.target.value;
                                      setWebhookEmbedFields(updated);
                                    }}
                                    className="glass-input"
                                    placeholder="Field Content"
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Footer Customization */}
                            <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff' }}>Embed Footer & Timestamp</span>
                                <label className="switch" style={{ width: '38px', height: '20px' }}>
                                  <input
                                    type="checkbox"
                                    checked={webhookFooterEnabled}
                                    onChange={(e) => setWebhookFooterEnabled(e.target.checked)}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>
                              {webhookFooterEnabled && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '10px' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Footer Text</label>
                                    <input
                                      type="text"
                                      value={webhookFooterText}
                                      onChange={(e) => setWebhookFooterText(e.target.value)}
                                      className="glass-input"
                                      placeholder="Footer Text"
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Footer Icon URL</label>
                                    <input
                                      type="text"
                                      value={webhookFooterIcon}
                                      onChange={(e) => setWebhookFooterIcon(e.target.value)}
                                      className="glass-input"
                                      placeholder="https://example.com/footer-icon.png"
                                    />
                                  </div>
                                </div>
                              )}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                                <input
                                  type="checkbox"
                                  id="webhookTimestampCheck"
                                  checked={webhookTimestamp}
                                  onChange={(e) => setWebhookTimestamp(e.target.checked)}
                                />
                                <label htmlFor="webhookTimestampCheck" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                  Show Current Timestamp on Embed
                                </label>
                              </div>
                            </div>

                          </div>
                        )}
                      </div>

                      {/* Section 4: Action Link Buttons */}
                      <div className="glass-panel" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Link size={18} style={{ color: 'var(--primary)' }} />
                            4. Action Row Link Buttons ({webhookButtons.length}/5)
                          </h3>
                          <button
                            type="button"
                            onClick={() => {
                              if (webhookButtons.length < 5) {
                                setWebhookButtons([...webhookButtons, { label: '', url: '' }]);
                              }
                            }}
                            disabled={webhookButtons.length >= 5}
                            className="btn-success"
                            style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                          >
                            + Add Button
                          </button>
                        </div>

                        {webhookButtons.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {webhookButtons.map((btn, idx) => (
                              <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                                <input
                                  type="text"
                                  value={btn.label}
                                  onChange={(e) => {
                                    const updated = [...webhookButtons];
                                    updated[idx].label = e.target.value;
                                    setWebhookButtons(updated);
                                  }}
                                  className="glass-input"
                                  placeholder="Button Label (e.g. Website)"
                                  style={{ flex: 1 }}
                                />
                                <input
                                  type="text"
                                  value={btn.url}
                                  onChange={(e) => {
                                    const updated = [...webhookButtons];
                                    updated[idx].url = e.target.value;
                                    setWebhookButtons(updated);
                                  }}
                                  className="glass-input"
                                  placeholder="https://website.com"
                                  style={{ flex: 1.5 }}
                                />
                                <button
                                  type="button"
                                  onClick={() => setWebhookButtons(webhookButtons.filter((_, i) => i !== idx))}
                                  className="btn-danger"
                                  style={{ padding: '6px 10px' }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Section 5: Actions Bar & Templates */}
                      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={handleSendWebhookAnnouncement}
                            disabled={sendingWebhook}
                            className="btn-primary"
                            style={{ flex: 1, padding: '12px', justifyContent: 'center', fontSize: '0.95rem' }}
                          >
                            <Send size={18} />
                            {sendingWebhook ? 'Posting Webhook Announcement...' : 'Send Webhook Announcement Now'}
                          </button>
                        </div>

                        {/* Save Template controls */}
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={webhookTemplateTitle}
                            onChange={(e) => setWebhookTemplateTitle(e.target.value)}
                            className="glass-input"
                            placeholder="Save as Template Name (e.g. Weekly News)..."
                            style={{ flex: 1 }}
                          />
                          <button
                            type="button"
                            onClick={handleSaveWebhookTemplate}
                            disabled={savingWebhookTemplate}
                            className="btn-secondary"
                            style={{ padding: '9px 16px', fontSize: '0.85rem' }}
                          >
                            <Save size={16} />
                            Save Template
                          </button>
                        </div>
                      </div>

                      {/* Section 6: Saved Templates List */}
                      {webhookTemplates.length > 0 && (
                        <div className="glass-panel" style={{ padding: '20px' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>
                            Saved Webhook Announcement Templates
                          </h3>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                            {webhookTemplates.map(tpl => (
                              <div
                                key={tpl._id}
                                className="glass-panel"
                                style={{ padding: '14px', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '8px' }}
                              >
                                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#ffffff' }}>
                                  {tpl.title}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                  Name: {tpl.webhookName || 'Default'}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                                  <button
                                    type="button"
                                    onClick={() => handleLoadWebhookTemplate(tpl)}
                                    className="btn-secondary"
                                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.78rem', justifyContent: 'center' }}
                                  >
                                    Load
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteWebhookTemplate(tpl._id)}
                                    className="btn-danger"
                                    style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Right Column: Real-Time Interactive Discord Preview */}
                    <div style={{
                      flex: '1 0 350px',
                      maxWidth: '520px',
                      position: 'sticky',
                      top: '24px',
                      zIndex: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        <Eye size={14} />
                        Live Discord Webhook Preview
                      </span>
                      <DiscordMessagePreview
                        botUser={{ username: user?.username }}
                        guildName={guildName}
                        guildIcon={guildIcon}
                        message={webhookMessageContent}
                        customWebhookName={webhookDisplayName}
                        customWebhookAvatar={webhookDisplayAvatar}
                        embedEnabled={webhookEmbedEnabled}
                        embedTitle={webhookEmbedTitle}
                        embedDesc={webhookEmbedDesc}
                        embedColor={webhookEmbedColor}
                        embedThumb={webhookThumbUrl}
                        embedImage={webhookImageUrl}
                        isDM={false}
                        pingType={webhookPingType}
                        pingRoleId={webhookPingRoleId}
                        roles={roles}
                        embedAuthorEnabled={webhookAuthorEnabled}
                        embedAuthorName={webhookAuthorName}
                        embedAuthorIcon={webhookAuthorIcon}
                        embedAuthorUrl={webhookAuthorUrl}
                        embedFooterEnabled={webhookFooterEnabled}
                        embedFooterText={webhookFooterText}
                        embedFooterIcon={webhookFooterIcon}
                        embedFields={webhookEmbedFields}
                        buttons={webhookButtons}
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 8.5: YOUTUBE ANNOUNCEMENTS */}
              {activeTab === 'youtube' && settings && (
                <div>

                  <div className="glass-panel" style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.01)', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>YouTube Upload Notifications</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Toggle the automated YouTube uploader checker system.</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.youtube?.enabled || false} 
                          onChange={() => handleToggle('youtube.enabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {settings.youtube?.enabled && (
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        {/* Channel URL connection row */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                            YouTube Channel URL or Handle <span style={{ color: 'var(--danger)' }}>*</span>
                          </label>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <input 
                              type="text" 
                              value={settings.youtube?.channelUrl || ''} 
                              onChange={(e) => handleInputChange('youtube.channelUrl', e.target.value)}
                              className="glass-input"
                              placeholder="e.g. @timo_xiter or https://youtube.com/channel/UC..."
                            />
                            <button
                              type="button"
                              onClick={handleResolveYoutubeChannel}
                              disabled={resolvingChannel || !settings.youtube?.channelUrl}
                              className="btn-primary"
                              style={{ whiteSpace: 'nowrap', minWidth: '130px', justifyContent: 'center' }}
                            >
                              {resolvingChannel ? 'Connecting...' : 'Connect Channel'}
                            </button>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                            Enter your YouTube custom handle (with @) or the full channel URL, then click Connect.
                          </span>
                        </div>

                        {/* Resolved Connection Status Banner */}
                        {settings.youtube?.channelId && (
                          <div className="glass-panel" style={{ 
                            padding: '12px 16px', 
                            backgroundColor: 'rgba(37, 99, 235, 0.05)', 
                            borderColor: 'rgba(37, 99, 235, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '10px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
                              <span style={{ fontSize: '0.88rem', fontWeight: '500' }}>
                                Connected Channel: <strong style={{ color: 'white' }}>{settings.youtube?.channelName || 'YouTube Channel'}</strong>
                              </span>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                              ID: {settings.youtube?.channelId}
                            </span>
                          </div>
                        )}

                        {resolveSuccessMsg && (
                          <div style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: '500' }}>
                            {resolveSuccessMsg}
                          </div>
                        )}

                        {/* Dropdown Configuration fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                          
                          {/* Discord Channel Dropdown */}
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                              Announcement Discord Channel <span style={{ color: 'var(--danger)' }}>*</span>
                            </label>
                            <select 
                              value={settings.youtube?.targetChannelId || ''}
                              onChange={(e) => handleInputChange('youtube.targetChannelId', e.target.value)}
                              className="glass-input"
                            >
                              <option value="">-- Select Discord Channel --</option>
                              {channels.map(ch => (
                                <option key={ch.id} value={ch.id}>#{ch.name}</option>
                              ))}
                            </select>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                              The channel where upload announcements will be published.
                            </span>
                          </div>

                          {/* Ping Mention Role Dropdown */}
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                              Mention Role (Ping)
                            </label>
                            <select 
                              value={settings.youtube?.pingRoleId || ''}
                              onChange={(e) => handleInputChange('youtube.pingRoleId', e.target.value)}
                              className="glass-input"
                            >
                              <option value="">-- None --</option>
                              <option value="everyone">@everyone</option>
                              <option value="here">@here</option>
                              {roles.map(role => (
                                <option key={role.id} value={role.id} style={{ color: role.color }}>@{role.name}</option>
                              ))}
                            </select>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                              Optional role to mention/ping when announcing new videos.
                            </span>
                          </div>

                        </div>

                        {/* Announcement Message Template */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                            Video Upload Message Template
                          </label>
                          <textarea 
                            value={settings.youtube?.messageTemplate || ''}
                            onChange={(e) => handleInputChange('youtube.messageTemplate', e.target.value)}
                            className="glass-input"
                            style={{ minHeight: '90px', fontFamily: 'monospace', fontSize: '0.9rem' }}
                            placeholder="{url}"
                          />
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                            Available Placeholders: <code>{`{channel}`}</code> (YouTube Channel Name), <code>{`{title}`}</code> (Video Title), <code>{`{url}`}</code> (Video Link).
                          </span>
                        </div>

                        {/* Custom Discord Live Preview */}
                        <div style={{ marginTop: '10px' }}>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                            Live Discord Announcement Preview
                          </label>
                          
                          <div style={{
                            backgroundColor: '#313338',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                            color: '#dbdee1',
                            fontSize: '0.9375rem',
                            lineHeight: '1.375rem',
                            border: '1px solid rgba(255,255,255,0.05)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                            width: '100%',
                            maxWidth: '520px'
                          }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                              <img 
                                src={user?.avatar 
                                  ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` 
                                  : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                                alt="" 
                                style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                              />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span style={{ fontWeight: '600', color: '#f2f3f5', fontSize: '0.95rem' }}>
                                    TIMO X MODE
                                  </span>
                                  <span style={{
                                    backgroundColor: '#5865F2',
                                    color: '#ffffff',
                                    fontSize: '0.625rem',
                                    fontWeight: '700',
                                    padding: '1px 4px',
                                    borderRadius: '3px',
                                    lineHeight: '0.8rem',
                                    height: '14px',
                                    display: 'inline-flex',
                                    alignItems: 'center'
                                  }}>
                                    BOT
                                  </span>
                                  <span style={{ fontSize: '0.72rem', color: '#949ba4' }}>
                                    Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                <div style={{ marginTop: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                  {/* Ping preview */}
                                  {settings.youtube?.pingRoleId && settings.youtube?.pingRoleId !== 'none' && (
                                    <span style={{ 
                                      backgroundColor: 'rgba(88, 101, 242, 0.3)', 
                                      color: '#c9cdfb', 
                                      padding: '0 4px', 
                                      borderRadius: '3px', 
                                      fontWeight: '500',
                                      marginRight: '6px',
                                      userSelect: 'none'
                                    }}>
                                      {settings.youtube?.pingRoleId === 'everyone' ? '@everyone' : 
                                       settings.youtube?.pingRoleId === 'here' ? '@here' : 
                                       `@${roles.find(r => r.id === settings.youtube?.pingRoleId)?.name || 'Role'}`}
                                    </span>
                                  )}
                                  
                                  {/* Message template preview resolved */}
                                  {(() => {
                                    let resolved = settings.youtube?.messageTemplate || '{url}';
                                    if (!/{url}/i.test(resolved)) {
                                      resolved = resolved.trim() ? `${resolved.trim()}\n{url}` : '{url}';
                                    }
                                    resolved = resolved
                                      .replace(/{channel}/gi, settings.youtube?.channelName || 'Timo Xiter')
                                      .replace(/{title}/gi, 'My Awesome New Video!')
                                      .replace(/{url}/gi, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                                    
                                    // Parse bold markdown tags **text** into HTML preview
                                    const parts = resolved.split(/(\*\*.*?\*\*)/g);
                                    return parts.map((part, index) => {
                                      if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={index} style={{ color: '#ffffff' }}>{part.slice(2, -2)}</strong>;
                                      }
                                      return part;
                                    });
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 9: TEMPORARY VOICE CHANNELS */}
              {activeTab === 'tempvoice' && settings && (
                <div>

                  <div className="glass-panel" style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Join-to-Create Voice Channels</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Toggle the automated temporary voice channel creation system.</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.tempVoice?.enabled || false} 
                          onChange={() => handleToggle('tempVoice.enabled')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    {(settings.tempVoice?.enabled) && (
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        {/* Dropdown triggers */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                          
                          {/* Join to Create Channel */}
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Trigger Channel (Join to Create)</label>
                            <select 
                              value={settings.tempVoice?.channelId || ''}
                              onChange={(e) => handleInputChange('tempVoice.channelId', e.target.value)}
                              className="glass-input"
                            >
                              <option value="">-- Select voice channel --</option>
                              {voiceChannels.map(ch => (
                                <option key={ch.id} value={ch.id}>🔊 {ch.name}</option>
                              ))}
                            </select>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                              When members join this channel, the bot will create their private room and move them.
                            </span>
                          </div>

                          {/* Target Category */}
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Target Category (Optional)</label>
                            <select 
                              value={settings.tempVoice?.categoryId || ''}
                              onChange={(e) => handleInputChange('tempVoice.categoryId', e.target.value)}
                              className="glass-input"
                            >
                              <option value="">-- Use same category as trigger channel --</option>
                              {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                              Specify the category where newly generated voice rooms will be grouped.
                            </span>
                          </div>

                        </div>

                        {/* Name Template */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Channel Name Template</label>
                          <input 
                            type="text" 
                            value={settings.tempVoice?.nameTemplate || ''}
                            onChange={(e) => handleInputChange('tempVoice.nameTemplate', e.target.value)}
                            className="glass-input"
                            style={{ maxWidth: '400px' }}
                            placeholder="🔊 {username}'s Room"
                          />
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                            Supports placeholders: Use <code>{`{username}`}</code> to insert the creator's username.
                          </span>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 8.8: PREMIUM POLLS */}
              {activeTab === 'polls' && (
                <div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start', marginBottom: '40px' }}>
                    {/* Left Column: Creator Form */}
                    <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
                      
                      {/* Target Channel */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Target Discord Channel <span style={{ color: 'var(--danger)' }}>*</span></label>
                        <select 
                          value={pollChannelId}
                          onChange={(e) => setPollChannelId(e.target.value)}
                          className="glass-input"
                        >
                          <option value="">-- Select Discord Channel --</option>
                          {channels.map(ch => (
                            <option key={ch.id} value={ch.id}># {ch.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Question */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Poll Question <span style={{ color: 'var(--danger)' }}>*</span></label>
                        <input 
                          type="text" 
                          value={pollQuestion}
                          onChange={(e) => setPollQuestion(e.target.value)}
                          maxLength={256}
                          className="glass-input"
                          placeholder="e.g., What feature should we build next?"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Description / Details (Optional)</label>
                        <textarea 
                          rows="3"
                          value={pollDescription}
                          onChange={(e) => setPollDescription(e.target.value)}
                          maxLength={1024}
                          className="glass-input"
                          placeholder="Provide context or explanation for the poll..."
                        />
                      </div>

                      {/* Options Configuration */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Poll Options ({pollOptions.length}/10)</h4>
                          <button 
                            type="button"
                            onClick={() => {
                              if (pollOptions.length < 10) setPollOptions([...pollOptions, '']);
                            }}
                            disabled={pollOptions.length >= 10}
                            className="btn-success"
                            style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                          >
                            + Add Option
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {pollOptions.map((opt, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', minWidth: '24px', fontWeight: '600' }}>#{idx + 1}</span>
                              <input 
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                  const updated = [...pollOptions];
                                  updated[idx] = e.target.value;
                                  setPollOptions(updated);
                                }}
                                className="glass-input"
                                placeholder={`Option ${idx + 1}`}
                                maxLength={80}
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  if (pollOptions.length > 2) {
                                    setPollOptions(pollOptions.filter((_, i) => i !== idx));
                                  } else {
                                    alert('A poll must have at least 2 options.');
                                  }
                                }}
                                className="btn-danger"
                                style={{ padding: '8px 12px', height: '38px', display: 'flex', alignItems: 'center' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Advanced Settings Row */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '14px' }}>Poll Settings</h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Allow Multiple Choices</span>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Voters can select more than one option.</p>
                            </div>
                            <label className="switch">
                              <input 
                                type="checkbox"
                                checked={pollMultipleChoice}
                                onChange={(e) => setPollMultipleChoice(e.target.checked)}
                              />
                              <span className="slider"></span>
                            </label>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                            <div>
                              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Anonymous Voting</span>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Hide the identity of voters (votes count will still update).</p>
                            </div>
                            <label className="switch">
                              <input 
                                type="checkbox"
                                checked={pollAnonymous}
                                onChange={(e) => setPollAnonymous(e.target.checked)}
                              />
                              <span className="slider"></span>
                            </label>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                            <div>
                              <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Show Live Results</span>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Allow users to see current vote counts in Discord before ending.</p>
                            </div>
                            <label className="switch">
                              <input 
                                type="checkbox"
                                checked={pollShowResultsBeforeEnding}
                                onChange={(e) => setPollShowResultsBeforeEnding(e.target.checked)}
                              />
                              <span className="slider"></span>
                            </label>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Auto-Expiration Date & Time (Optional)</label>
                            <input 
                              type="datetime-local"
                              value={pollExpiresAt}
                              onChange={(e) => setPollExpiresAt(e.target.value)}
                              className="glass-input"
                              style={{ width: '100%' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Embed Customization */}
                      <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '14px' }}>Style Customization</h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Embed Color</label>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <input 
                                  type="color" 
                                  value={pollColor}
                                  onChange={(e) => setPollColor(e.target.value)}
                                  style={{ width: '40px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', background: 'none' }}
                                />
                                <input 
                                  type="text" 
                                  value={pollColor}
                                  onChange={(e) => setPollColor(e.target.value)}
                                  className="glass-input" 
                                  placeholder="#2563eb"
                                />
                              </div>
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Thumbnail URL</label>
                              <input 
                                type="text"
                                value={pollThumbnailUrl}
                                onChange={(e) => setPollThumbnailUrl(e.target.value)}
                                className="glass-input"
                                placeholder="https://example.com/thumbnail.png"
                              />
                            </div>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Image URL</label>
                            <input 
                              type="text"
                              value={pollImageUrl}
                              onChange={(e) => setPollImageUrl(e.target.value)}
                              className="glass-input"
                              placeholder="https://example.com/banner.png"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <button 
                          type="button" 
                          onClick={handleCreatePoll} 
                          disabled={creatingPoll} 
                          className="btn-primary"
                          style={{ gap: '10px' }}
                        >
                          <Send size={18} />
                          {creatingPoll ? 'Publishing...' : 'Publish Poll'}
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Live Discord Preview */}
                    <div style={{ 
                      flex: '1 0 350px',
                      maxWidth: '520px',
                      position: 'sticky', 
                      top: '24px', 
                      zIndex: 10,
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '12px' 
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        <Eye size={14} />
                        Live Discord Preview
                      </span>
                      <DiscordMessagePreview 
                        botUser={{ username: user?.username }}
                        guildName={guildName}
                        guildIcon={guildIcon}
                        message={pollDescription}
                        buttonEnabled={false}
                        buttonLabel=""
                        embedEnabled={true}
                        embedTitle={`Poll: ${pollQuestion || 'Enter Question'}`}
                        embedDesc={pollDescription}
                        embedColor={pollColor}
                        embedThumb={pollThumbnailUrl}
                        embedImage={pollImageUrl}
                        isDM={false}
                        buttons={pollOptions.filter(Boolean).map(opt => ({ label: opt }))}
                      />
                    </div>
                  </div>

                  {/* Polls History & Live Stats — Premium Glassmorphic Design */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '36px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Manage Server Polls</h3>
                        <p style={{ fontSize: '0.82rem', color: 'rgba(148,163,184,0.7)', margin: '4px 0 0 0' }}>{polls.length} poll{polls.length !== 1 ? 's' : ''} found</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)', fontSize: '0.78rem', color: '#60a5fa', fontWeight: '600' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
                        Live Synced
                      </div>
                    </div>

                    {polls.length === 0 ? (
                      <div style={{
                        padding: '60px 40px',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(2,6,23,0.9))',
                        border: '1px dashed rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        backdropFilter: 'blur(12px)'
                      }}>
                        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📊</div>
                        <p style={{ color: 'rgba(148,163,184,0.8)', margin: 0, fontSize: '1rem' }}>No polls yet. Create your first poll above or use <code style={{ color: '#60a5fa', background: 'rgba(96,165,250,0.1)', padding: '2px 6px', borderRadius: '4px' }}>/poll</code> in Discord!</p>
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '22px' }}>
                        {polls.map(poll => {
                          const allVoters = new Set();
                          let maxVotes = 0;
                          poll.options.forEach(opt => {
                            if (opt.votes) opt.votes.forEach(v => allVoters.add(v));
                            const cnt = opt.votes ? opt.votes.length : 0;
                            if (cnt > maxVotes) maxVotes = cnt;
                          });
                          const totalVotes = allVoters.size;
                          const isPollActive = poll.status === 'active';
                          const themeColor = poll.settings?.color || '#2563eb';

                          return (
                            <div
                              key={poll._id}
                              style={{
                                position: 'relative',
                                background: 'linear-gradient(145deg, rgba(15,23,42,0.95) 0%, rgba(2,6,23,0.98) 100%)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: isPollActive
                                  ? `1px solid ${themeColor}55`
                                  : '1px solid rgba(255,255,255,0.07)',
                                borderRadius: '20px',
                                padding: '22px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                boxShadow: isPollActive
                                  ? `0 0 30px ${themeColor}22, 0 8px 32px rgba(0,0,0,0.5)`
                                  : '0 8px 32px rgba(0,0,0,0.4)',
                                cursor: 'default',
                                overflow: 'hidden'
                              }}
                            >
                              {/* Subtle top accent line */}
                              <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0,
                                height: '2px',
                                background: isPollActive
                                  ? `linear-gradient(90deg, transparent, ${themeColor}, transparent)`
                                  : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                                borderRadius: '20px 20px 0 0'
                              }} />

                              {/* Header Row */}
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  {/* Status Badge */}
                                  {isPollActive ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '999px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', fontSize: '0.7rem', fontWeight: '700', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
                                      Active
                                    </div>
                                  ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '999px', background: 'rgba(100,116,139,0.15)', border: '1px solid rgba(100,116,139,0.25)', fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                      Ended
                                    </div>
                                  )}
                                  {/* Color dot */}
                                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: themeColor, boxShadow: `0 0 6px ${themeColor}` }} />
                                </div>
                                <span style={{ fontSize: '0.7rem', color: 'rgba(148,163,184,0.5)', fontWeight: '500' }}>
                                  {new Date(poll.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              </div>

                              {/* Question */}
                              <div>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#f1f5f9', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                                  {poll.question}
                                </h4>
                                {poll.description && (
                                  <p style={{ fontSize: '0.78rem', color: 'rgba(148,163,184,0.7)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                                    {poll.description}
                                  </p>
                                )}
                              </div>

                              {/* Premium Progress Bars */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {poll.options.map((opt, idx) => {
                                  const optVotes = opt.votes ? opt.votes.length : 0;
                                  const pct = totalVotes > 0 ? Math.round((optVotes / totalVotes) * 100) : 0;
                                  const isWinner = !isPollActive && optVotes > 0 && optVotes === maxVotes;
                                  const barColor = isWinner ? '#eab308' : themeColor;

                                  return (
                                    <div key={opt.id || idx} style={{ position: 'relative' }}>
                                      {/* Label Row */}
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                        <span style={{
                                          fontSize: '0.8rem',
                                          fontWeight: isWinner ? '700' : '500',
                                          color: isWinner ? '#fde047' : 'rgba(226,232,240,0.85)',
                                          display: 'flex', alignItems: 'center', gap: '5px',
                                          maxWidth: '72%',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap'
                                        }}>
                                          {isWinner && <span style={{ fontSize: '0.9rem' }}>👑</span>}
                                          {opt.text}
                                        </span>
                                        <span style={{
                                          fontSize: '0.78rem',
                                          fontWeight: '700',
                                          color: isWinner ? '#fde047' : 'rgba(226,232,240,0.9)',
                                          whiteSpace: 'nowrap'
                                        }}>
                                          {pct}% <span style={{ opacity: 0.5, fontWeight: '400' }}>({optVotes})</span>
                                        </span>
                                      </div>

                                      {/* Bar Track */}
                                      <div style={{
                                        width: '100%',
                                        height: '10px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '999px',
                                        overflow: 'hidden',
                                        position: 'relative'
                                      }}>
                                        {/* Filled portion */}
                                        <div style={{
                                          width: `${pct}%`,
                                          height: '100%',
                                          background: isWinner
                                            ? 'linear-gradient(90deg, #ca8a04, #fde047)'
                                            : `linear-gradient(90deg, ${themeColor}, ${themeColor}cc)`,
                                          borderRadius: '999px',
                                          position: 'relative',
                                          boxShadow: pct > 0 ? `0 0 10px ${barColor}88` : 'none'
                                        }}>
                                          {/* Sheen overlay */}
                                          {pct > 10 && (
                                            <div style={{
                                              position: 'absolute',
                                              inset: 0,
                                              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                                              borderRadius: '999px'
                                            }} />
                                          )}
                                        </div>
                                      </div>

                                      {/* Winner gold border accent */}
                                      {isWinner && (
                                        <div style={{
                                          position: 'absolute',
                                          inset: -1,
                                          borderRadius: '6px',
                                          border: '1px solid rgba(234,179,8,0.25)',
                                          pointerEvents: 'none'
                                        }} />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Footer */}
                              <div style={{
                                borderTop: '1px solid rgba(255,255,255,0.06)',
                                paddingTop: '14px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.7)' }}>
                                    🗳️ <strong style={{ color: '#e2e8f0' }}>{totalVotes}</strong> voter{totalVotes !== 1 ? 's' : ''}
                                  </span>
                                  {poll.settings?.multipleChoice && (
                                    <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: '4px', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)', fontWeight: '600' }}>
                                      Multi-Choice
                                    </span>
                                  )}
                                  {poll.settings?.anonymous && (
                                    <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: '4px', background: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.2)', fontWeight: '600' }}>
                                      Anon
                                    </span>
                                  )}
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                  {isPollActive && (
                                    <button
                                      type="button"
                                      onClick={() => handleEndPoll(poll._id)}
                                      style={{
                                        padding: '6px 14px',
                                        fontSize: '0.72rem',
                                        fontWeight: '700',
                                        border: '1px solid rgba(251,191,36,0.35)',
                                        background: 'rgba(251,191,36,0.1)',
                                        color: '#fbbf24',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        letterSpacing: '0.03em'
                                      }}
                                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,191,36,0.2)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(251,191,36,0.25)'; }}
                                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(251,191,36,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    >
                                      End Poll
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePoll(poll._id)}
                                    style={{
                                      padding: '6px 14px',
                                      fontSize: '0.72rem',
                                      fontWeight: '700',
                                      border: '1px solid rgba(239,68,68,0.3)',
                                      background: 'rgba(239,68,68,0.08)',
                                      color: '#f87171',
                                      borderRadius: '8px',
                                      cursor: 'pointer',
                                      letterSpacing: '0.03em'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(239,68,68,0.2)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Save Settings Button footer */}
              {activeTab !== 'overview' && activeTab !== 'logs' && activeTab !== 'broadcast' && activeTab !== 'publish' && activeTab !== 'polls' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <button 
                    type="button"
                    onClick={handleReset}
                    disabled={saving || !hasUnsavedChanges()}
                    className="btn-secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    Reset Changes
                  </button>
                  <button 
                    type="submit" 
                    disabled={saving} 
                    className="btn-primary"
                    style={{ gap: '10px' }}
                  >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              )}

            </form>
            )}
          </main>
        </div>

      {showCropModal && uploadFile && (
        <CropModal 
          file={uploadFile}
          onClose={() => {
            setShowCropModal(false);
            setUploadFile(null);
          }}
          onCrop={async ({ file, cropX, cropY, cropWidth, cropHeight }) => {
            setShowCropModal(false);
            setUploadFile(null);
            setSaving(true);
            setErrorMsg(null);
            try {
              const res = await api.uploadBackground(guildId, file, { cropX, cropY, cropWidth, cropHeight });
              handleInputChange('welcome.background', res.url);
              showNotification('Background uploaded and cropped successfully!');
            } catch (err) {
              console.error(err);
              setErrorMsg(err.message || 'File upload failed.');
            } finally {
              setSaving(false);
            }
          }}
        />
      )}
    </div>
  );
}
