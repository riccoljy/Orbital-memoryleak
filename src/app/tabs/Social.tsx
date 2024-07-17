import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/src/supabase/supabase';
import Collapsible from 'react-native-collapsible';

type Post = {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
  name: string;
  'replies-social'?: Reply[];
};

type Reply = {
  id: number;
  user_id: string;
  content: string;
  post_id: string;
  created_at: string;
  name: string;
};

const { width } = Dimensions.get('window');
const horiz = width * 0.05;

const Social = () => {
  const [name, setName] = useState('');
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [replyStuff, setReplyStuff] = useState('');
  const [newStuff, setNewStuff] = useState('');
  const [userId, setUserId] = useState('');
 

  const getPosts = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.log(userError);
      return;
    }

    if (userData?.user?.id) {
      setUserId(userData.user.id);
    }
    if (userData?.user?.user_metadata?.first_name) {
      setName(userData?.user?.user_metadata?.first_name);
    }

    const { data, error: postError } = await supabase
      .from('posts-social')
      .select(`
        id, created_at, user_id, content, name,
        replies-social(id, user_id, content, post_id, created_at, name)
      `)
      .order('created_at', { ascending: false });

    if (postError) {
      console.log(postError);
    } else {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const post = async (id: string, content: string) => {
    try {
      const { data, error } = await supabase
        .from('posts-social')
        .insert([{ user_id: id, content, name }])
        .single();

      if (error) {
        throw error;
      }

      setPosts(prevPosts => [data, ...prevPosts]);
      setNewStuff('');
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const reply = async (id: string, content: string, postId: number) => {
    try {
      const { data, error } = await supabase
        .from('replies-social')
        .insert([{ user_id: id, content, post_id: postId, name }])
        .single();

      if (error) {
        throw error;
      }

      const updated = posts.map((post: Post) =>
        post.id === postId ? { ...post, 'replies-social': [...post['replies-social'] || [], data] } : post
      );

      setPosts(updated);
      setReplyStuff('');
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: horiz }}>
        <Text style={styles.title}>Social Hub</Text>
        <View style={styles.newPostContainer}>
          <TextInput
            style={styles.input}
            placeholder="What's on your mind?"
            value={newStuff}
            onChangeText={setNewStuff}
          />
          <Button title="Post" onPress={() => post(userId, newStuff)} disabled={!newStuff} />
        </View>
        <View style={styles.divider} />
        <FlatList
          data={posts}
          renderItem={({ item }) =>
            item ? (
              <View style={styles.postContainer}>
                <Text style={styles.postContent}>{item.content}</Text>
                <Text style={styles.postInfo}>Posted by: {item.name}</Text>
                <Text style={styles.postInfo}>{new Date(item.created_at).toLocaleString()}</Text>

                <TouchableOpacity onPress={() => {
                  return setActivePostId(activePostId === item.id ? null : item.id);
                }}>
                  <Text style={styles.replyButton}>
                    {activePostId === item.id ? 'Hide Replies' : 'View Replies'}
                  </Text>
                </TouchableOpacity>

                <Collapsible collapsed={activePostId !== item.id}>
                  {item['replies-social'] && item['replies-social'].length > 0 ? (
                    <FlatList
                      data={item['replies-social']}
                      renderItem={({ item: reply }) =>
                        reply ? (
                          <View style={styles.replyContainer}>
                            <Text style={styles.replyContent}>{reply.content}</Text>
                            <Text style={styles.replyInfo}>Replied by: {reply.name}</Text>
                            <Text style={styles.replyInfo}>{new Date(reply.created_at).toLocaleString()}</Text>
                          </View>
                        ) : null
                      }
                      keyExtractor={reply => {
                        if (reply && reply.id) {
                          return reply.id.toString();
                        }
                        return '';
                      }}
                      contentContainerStyle={styles.replyList}
                    />
                  ) : (
                    <Text style={styles.noRepliesText}>No replies yet</Text>
                  )}

                  <View style={styles.newReplyContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Write a reply..."
                      value={replyStuff}
                      onChangeText={setReplyStuff}
                    />
                    <Button title="Reply" onPress={() => reply(userId, replyStuff, item.id)} disabled={!replyStuff} />
                  </View>
                </Collapsible>
              </View>
            ) : null
          }
          keyExtractor={post => {
            if (post && post.id) {
              return post.id.toString();
            }
            return '';
          }}
          contentContainerStyle={styles.postList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#161622',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 28,
  },
  newPostContainer: {
    backgroundColor: '#2B2B40',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newReplyContainer: {
    marginTop: 8,
  },
  input: {
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingLeft: 8,
    color: 'white',
  },
  postContainer: {
    backgroundColor: '#2B2B40',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  postInfo: {
    fontSize: 12,
    color: '#D3D3D3',
  },
  replyContainer: {
    backgroundColor: '#4D4D6E', 
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  replyContent: {
    fontSize: 14,
    marginBottom: 8,
    color: 'white',
  },
  replyInfo: {
    fontSize: 10,
    color: 'white',
  },
  replyList: {
    marginTop: 8,
  },
  noRepliesText: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginVertical: 16,
    marginBottom: 30,
  },
  postList: {
    paddingBottom: 16,
  },
  replyButton: {
    color: '#007bff',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Social;
