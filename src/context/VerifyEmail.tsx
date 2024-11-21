import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {Button} from '../atoms';
import {sendEmailVerification} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {Gap} from '../atoms';
import {Loading} from '../molecules';

export const VerifyEmail = ({route, navigation}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {email} = route.params;
  const auth = getAuth();

  useEffect(() => {
    let interval;
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoading(true);
        interval = setInterval(async () => {
          try {
            await user.reload();
            if (user.emailVerified) {
              clearInterval(interval);
              setIsVerified(true);
              setIsLoading(false);
              showMessage({
                message: 'Email verified successfully!',
                type: 'success',
              });
              await auth.signOut();
              navigation.replace('SignIn');
            }
          } catch (error) {
            setIsLoading(false);
            console.error('Error checking verification status:', error);
          }
        }, 3000);
      }
    });

    return () => {
      unsubscribe();
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [navigation]);

  const resendVerification = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      setIsLoading(false);
      if (user) {
        await sendEmailVerification(user);
        showMessage({
          message: 'Verification email resent!',
          type: 'success',
        });
      }
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: 'Failed to resend verification email',
        type: 'danger',
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Verify your email</Text>
        <Text style={styles.message}>
          We sent a verification email to {email}. Please verify your email to
          continue.
        </Text>
        <Button
          textColor="white"
          color="#5046E5"
          text="Resend verification email"
          onPress={resendVerification}
        />
        <Gap height={20} />
        <Button
          textColor="white"
          color="#5046E5"
          text="Back to Sign In"
          onPress={() => navigation.replace('SignIn')}
        />
      </View>
      {isLoading && <Loading />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121927',
  },
  title: {
    marginTop: 300,
    alignSelf: 'center',
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Lexend-Bold',
    color: 'white',
  },
  message: {
    maxWidth: 350,
    alignSelf: 'center',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Lexend-Regular',
    color: 'white',
  },
});
