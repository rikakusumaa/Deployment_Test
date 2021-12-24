import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

data_path = "clustering.csv"
df = pd.read_csv(data_path)

df.drop(df[df.popularity < 65].index, inplace=True)

def create_artist_music(x):
    return x['artist_name'] + ' ' + x['music_name']
df['artist_music'] = df.apply(create_artist_music, axis=1)

def create_gabungan(x):
    return x['moods'] + ' ' + x['artist_name']
df['gabungan'] = df.apply(create_gabungan, axis=1)

df_cbf = pd.DataFrame({
    'artist_music': df['artist_music'],
    'artist_name': df['artist_name'],
    'music_name': df['music_name'],
    'music_id': df['music_id'],
    'moods': df['moods'],
    'gabungan': df['gabungan']
})

# Inisialisasi TfidfVectorizer
tf = TfidfVectorizer()
 
# Melakukan perhitungan idf pada data gabungan
tf.fit(df_cbf['gabungan']) 
 
# Mapping array dari fitur index integer ke fitur nama
tf.get_feature_names() 

# Melakukan fit lalu ditransformasikan ke bentuk matrix
tfidf_matrix = tf.fit_transform(df_cbf['gabungan']) 
 
# Melihat ukuran matrix tfidf
tfidf_matrix.shape

# Mengubah vektor tf-idf dalam bentuk matriks dengan fungsi todense()
tfidf_matrix.todense()
 
pd.DataFrame(
    tfidf_matrix.todense(), 
    columns=tf.get_feature_names(),
    index=df_cbf['artist_music'],
)

# Menghitung cosine similarity pada matrix tf-idf
cosine_sim = cosine_similarity(tfidf_matrix) 
cosine_sim

# Membuat dataframe dari variabel cosine_sim dengan baris dan kolom berupa artist_music
cosine_sim_df = pd.DataFrame(cosine_sim, index=df_cbf['artist_music'], columns=df_cbf['artist_music'])
print('Shape:', cosine_sim_df.shape)
 
# Melihat similarity matrix pada setiap artist_music
cosine_sim_df.sample(5, axis=1).sample(10, axis=0)

def music_recommendations(artist_music, similarity_data=cosine_sim_df, items=df_cbf[['artist_music','music_name','artist_name','moods']], k=10):
    
    index = similarity_data.loc[:,artist_music].to_numpy().argpartition(range(-1, -k, -1))
    
    closest = similarity_data.columns[index[-1:-(k+2):-1]]
    
    closest = closest.drop(artist_music, errors='ignore')
 
    return pd.DataFrame(closest).merge(items).head(k).to_html()


