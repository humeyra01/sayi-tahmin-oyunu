import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Keyboard,
} from 'react-native';

export default function App() {
  // 1-100 arası gizli sayı state'i
  const [gizli, setGizli] = useState(Math.floor(Math.random() * 100) + 1);
  // Kullanıcının girdiği metin
  const [tahminInput, setTahminInput] = useState('');
  // Ekranda gösterilecek yönlendirme mesajı
  const [mesaj, setMesaj] = useState('1 ile 100 arasında bir sayı tuttum.');
  // Kaç tahmin yapıldığını sayan state
  const [denemeSayisi, setDenemeSayisi] = useState(0);
  // Oyunun bitip bitmediğini tutan state (Yeniden Oyna butonu için)
  const [bildiMi, setBildiMi] = useState(false);

  const tahminiKontrolEt = () => {
    const girilenSayi = parseInt(tahminInput, 10);

    // Geçersiz giriş kontrolü (boş, sayı değil veya 1-100 dışı)
    if (
        tahminInput.trim() === '' ||
        isNaN(girilenSayi) ||
        girilenSayi < 1 ||
        girilenSayi > 100
    ) {
      Alert.alert('Geçersiz Giriş', 'Lütfen 1 ile 100 arasında bir sayı girin.');
      setTahminInput('');
      return;
    }

    // Deneme sayısını 1 artır
    const yeniDeneme = denemeSayisi + 1;
    setDenemeSayisi(yeniDeneme);

    // Karşılaştırma mantığı
    if (girilenSayi < gizli) {
      setMesaj('Daha büyük!');
    } else if (girilenSayi > gizli) {
      setMesaj('Daha küçük!');
    } else {
      setMesaj(`Bildin! 🎉 (${yeniDeneme}. tahminde buldun)`);
      setBildiMi(true);
      Keyboard.dismiss(); // Bilince klavyeyi kapat
    }

    // Her tahminden sonra kutuyu temizle
    setTahminInput('');
  };

  // Bonus: Oyunu sıfırlama fonksiyonu
  const yenidenOyna = () => {
    setGizli(Math.floor(Math.random() * 100) + 1);
    setTahminInput('');
    setMesaj('Yeni bir sayı tuttum, tahmin et!');
    setDenemeSayisi(0);
    setBildiMi(false);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.baslik}>Sayı Tahmin Oyunu</Text>

        <Text style={styles.sayac}>Deneme Sayısı: {denemeSayisi}</Text>

        <Text style={styles.mesaj}>{mesaj}</Text>

        {!bildiMi ? (
            <>
              <TextInput
                  style={styles.input}
                  value={tahminInput}
                  onChangeText={setTahminInput}
                  placeholder="Tahminin..."
                  keyboardType="number-pad" // Sadece rakam klavyesi açar
                  maxLength={3} // En fazla 3 basamak (100) girilebilir
              />

              <Pressable
                  style={({ pressed }) => [
                    styles.buton,
                    pressed && styles.butonBasili,
                  ]}
                  onPress={tahminiKontrolEt}
              >
                <Text style={styles.butonYazi}>Tahmin Et</Text>
              </Pressable>
            </>
        ) : (
            <Pressable
                style={({ pressed }) => [
                  styles.buton,
                  styles.yenidenButon,
                  pressed && styles.butonBasili,
                ]}
                onPress={yenidenOyna}
            >
              <Text style={styles.butonYazi}>Yeniden Oyna</Text>
            </Pressable>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  baslik: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  sayac: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 25,
  },
  mesaj: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    width: '70%',
    height: 55,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  buton: {
    width: '70%',
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  yenidenButon: {
    backgroundColor: '#16a34a',
  },
  butonBasili: {
    opacity: 0.8,
  },
  butonYazi: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});