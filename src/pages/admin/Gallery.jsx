// src/pages/admin/Gallery.jsx
import { useState, useEffect, useRef } from 'react'
import Modal from '../../components/Modal'
import { supabase } from '../../lib/supabase'

const PALETTE = [
  ['#667eea','#764ba2'],['#f093fb','#f5576c'],['#4facfe','#00f2fe'],
  ['#43e97b','#38f9d7'],['#fa709a','#fee140'],['#a18cd1','#fbc2eb'],
]
const categories = ['Semua','Outdoor','Indoor','Garden','Beach','Ballroom']

function getInitials(name) {
  const parts = (name||'').split(/[\s&]+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0]+parts[1][0]).toUpperCase()
  return parts[0]?.slice(0,2).toUpperCase() || '?'
}

const HeartIcon = ({size=28,opacity=0.18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" style={{opacity}}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const empty = { couple:'', category:'Outdoor', date:'' }

export default function Gallery() {
  const [photos, setPhotos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('Semua')
  const [modal, setModal]     = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm]       = useState(empty)
  const [file, setFile]       = useState(null)
  const [preview, setPreview] = useState(null)
  const [saving, setSaving]   = useState(false)
  const [focused, setFocused] = useState({})
  const fileRef               = useRef()

  useEffect(() => { fetchGallery() }, [])

  const fetchGallery = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('Fetch gallery error:', error)
      alert(`Gagal memuat galeri: ${error.message}\n\nKemungkinan RLS (Row Level Security) aktif di tabel gallery. Silakan tambahkan policy SELECT di Supabase Dashboard.`)
    }
    const parsed = (data||[]).map(item => ({
      ...item,
      color: (() => { try { return JSON.parse(item.color) } catch { return PALETTE[0] } })()
    }))
    setPhotos(parsed)
    setLoading(false)
  }

  const filtered = filter === 'Semua' ? photos : photos.filter(p => p.category === filter)

  const openAdd     = () => { setForm(empty); setFile(null); setPreview(null); setModal('add') }
  const openPreview = (p) => { setSelected(p); setModal('preview') }
  const close       = () => { setModal(null); setSelected(null); setFile(null); setPreview(null) }
  const set         = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSave = async () => {
    if (!form.couple.trim()) return
    setSaving(true)
    const colorArray = PALETTE[photos.length % PALETTE.length]
    let imageUrl = null

    if (file) {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${form.couple.replace(/\s/g,'-')}.${ext}`
      const { error: upErr } = await supabase.storage
        .from('galeri')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })
      if (upErr) {
        console.error('Upload storage error:', upErr)
        alert(`Gagal upload foto ke storage: ${upErr.message}`)
      } else {
        const { data: urlData } = supabase.storage.from('galeri').getPublicUrl(fileName)
        imageUrl = urlData.publicUrl
        console.log('Upload berhasil, URL:', imageUrl)
      }
    }

    const { data, error } = await supabase.from('gallery').insert([{
      couple: form.couple,
      category: form.category,
      date: form.date,
      color: JSON.stringify(colorArray),
      image_url: imageUrl,
    }]).select().single()

    if (error) {
      console.error('Insert gallery error:', error)
      alert(`Foto berhasil di-upload ke storage, tapi GAGAL menyimpan data ke tabel gallery: ${error.message}\n\nKemungkinan penyebab:\n1. RLS (Row Level Security) aktif - tambahkan policy INSERT di tabel gallery\n2. Struktur tabel tidak sesuai`)
    } else if (data) {
      console.log('Insert berhasil:', data)
      setPhotos(prev => [{ ...data, color: colorArray }, ...prev])
    }
    setSaving(false)
    close()
  }

  const handleDelete = async (id, imageUrl, e) => {
    e.stopPropagation()
    if (imageUrl) {
      const fileName = imageUrl.split('/').pop()
      await supabase.storage.from('galeri').remove([fileName])
    }
    await supabase.from('gallery').delete().eq('id', id)
    setPhotos(prev => prev.filter(p => p.id !== id))
  }

  const fStyle = (key) => ({
    width:'100%', padding:'9px 12px', boxSizing:'border-box',
    border:`1.5px solid ${focused[key]?'#4f46e5':'#dee2e6'}`,
    borderRadius:8, fontSize:13, outline:'none', fontFamily:'inherit'
  })

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:200}}>
      <p style={{color:'#868e96',fontSize:14}}>Memuat data...</p>
    </div>
  )

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:700,color:'#1a1a2e',marginBottom:2}}>Galeri</h1>
          <p style={{fontSize:13,color:'#868e96'}}>Dokumentasi foto pernikahan klien</p>
        </div>
        <button onClick={openAdd} style={{padding:'9px 18px',borderRadius:8,fontSize:13,fontWeight:600,background:'linear-gradient(135deg,#4f46e5,#7c3aed)',color:'#fff',border:'none',cursor:'pointer',boxShadow:'0 2px 8px rgba(79,70,229,0.3)'}}>+ Upload Foto</button>
      </div>

      <div style={{display:'flex',gap:8,marginBottom:24,flexWrap:'wrap'}}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{padding:'7px 16px',borderRadius:50,fontSize:13,fontWeight:500,cursor:'pointer',border:filter===cat?'none':'1px solid #e9ecef',background:filter===cat?'linear-gradient(135deg,#4f46e5,#7c3aed)':'#fff',color:filter===cat?'#fff':'#495057'}}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:16}}>
        {filtered.length === 0 && <p style={{color:'#adb5bd',fontSize:14,gridColumn:'1/-1',textAlign:'center',padding:40}}>Tidak ada foto</p>}
        {filtered.map(p => {
          const [c1,c2] = Array.isArray(p.color) ? p.color : PALETTE[0]
          const initials = getInitials(p.couple)
          return (
            <div key={p.id} onClick={() => openPreview(p)} style={{borderRadius:14,overflow:'hidden',cursor:'pointer',aspectRatio:'4/3',position:'relative',transition:'transform 0.2s,box-shadow 0.2s',boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.03)';e.currentTarget.style.boxShadow='0 10px 30px rgba(0,0,0,0.18)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'}}
            >
              {p.image_url ? (
                <img src={p.image_url} alt={p.couple} style={{width:'100%',height:'100%',objectFit:'cover'}} />
              ) : (
                <div style={{width:'100%',height:'100%',background:`linear-gradient(135deg,${c1},${c2})`,display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                  <div style={{position:'absolute',top:16,left:16}}><HeartIcon /></div>
                  <div style={{width:60,height:60,borderRadius:'50%',background:'rgba(255,255,255,0.25)',backdropFilter:'blur(4px)',border:'2px solid rgba(255,255,255,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:800,color:'#fff'}}>{initials}</div>
                </div>
              )}
              <div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(0,0,0,0.6))',padding:'20px 12px 10px'}}>
                <p style={{fontWeight:700,fontSize:13,color:'#fff',marginBottom:2}}>{p.couple}</p>
                <p style={{fontSize:11,color:'rgba(255,255,255,0.8)'}}>{p.category} · {p.date}</p>
              </div>
              <button onClick={e=>handleDelete(p.id,p.image_url,e)} style={{position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.35)',color:'#fff',border:'none',borderRadius:'50%',width:26,height:26,cursor:'pointer',fontSize:11,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(4px)'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(224,49,49,0.8)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(0,0,0,0.35)'}
              >✕</button>
            </div>
          )
        })}
      </div>
      <p style={{marginTop:14,fontSize:12,color:'#adb5bd'}}>{filtered.length} foto ditampilkan</p>

      {/* Modal Upload */}
      <Modal isOpen={modal==='add'} onClose={close} title="Upload Foto"
        footer={
          <>
            <button onClick={close} style={{padding:'9px 18px',borderRadius:8,border:'1px solid #e9ecef',background:'#fff',fontSize:13,cursor:'pointer',fontFamily:'inherit'}}>Batal</button>
            <button onClick={handleSave} disabled={saving} style={{padding:'9px 18px',borderRadius:8,border:'none',background:'linear-gradient(135deg,#4f46e5,#7c3aed)',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',opacity:saving?0.7:1}}>
              {saving?'Mengupload...':'Simpan'}
            </button>
          </>
        }
      >
        {/* Upload area */}
        <div onClick={()=>fileRef.current?.click()} style={{border:'2px dashed #dee2e6',borderRadius:10,padding:'20px',textAlign:'center',cursor:'pointer',marginBottom:14,background:'#fafafa',transition:'all 0.2s'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='#4f46e5';e.currentTarget.style.background='#f5f3ff'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='#dee2e6';e.currentTarget.style.background='#fafafa'}}
        >
          {preview ? (
            <img src={preview} alt="preview" style={{width:'100%',height:140,objectFit:'cover',borderRadius:8}} />
          ) : (
            <div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#adb5bd" strokeWidth="1.5" style={{margin:'0 auto 8px',display:'block'}}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p style={{fontSize:13,color:'#adb5bd',marginBottom:4}}>Klik untuk pilih foto</p>
              <p style={{fontSize:11,color:'#dee2e6'}}>JPG, PNG, WEBP — maks 5MB</p>
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{display:'none'}} />

        <div style={{marginBottom:13}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#495057',marginBottom:5}}>Nama Pasangan <span style={{color:'#fa5252'}}>*</span></label>
          <input value={form.couple} onChange={set('couple')} placeholder="Contoh: Reza & Dina" style={fStyle('couple')} onFocus={()=>setFocused(f=>({...f,couple:true}))} onBlur={()=>setFocused(f=>({...f,couple:false}))} />
        </div>
        <div style={{marginBottom:13}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#495057',marginBottom:5}}>Kategori</label>
          <select value={form.category} onChange={set('category')} style={fStyle('category')} onFocus={()=>setFocused(f=>({...f,category:true}))} onBlur={()=>setFocused(f=>({...f,category:false}))}>
            {categories.filter(c=>c!=='Semua').map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#495057',marginBottom:5}}>Tanggal</label>
          <input type="date" value={form.date} onChange={set('date')} style={fStyle('date')} onFocus={()=>setFocused(f=>({...f,date:true}))} onBlur={()=>setFocused(f=>({...f,date:false}))} />
        </div>
      </Modal>

      {/* Modal Preview */}
      <Modal isOpen={modal==='preview'} onClose={close} title="Detail Foto"
        footer={<button onClick={close} style={{padding:'9px 18px',borderRadius:8,border:'none',background:'linear-gradient(135deg,#4f46e5,#7c3aed)',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Tutup</button>}
      >
        {selected && (
          <div style={{textAlign:'center'}}>
            {selected.image_url ? (
              <img src={selected.image_url} alt={selected.couple} style={{width:'100%',borderRadius:12,marginBottom:16,maxHeight:240,objectFit:'cover'}} />
            ) : (
              <div style={{width:'100%',aspectRatio:'16/9',borderRadius:12,background:`linear-gradient(135deg,${(Array.isArray(selected.color)?selected.color:PALETTE[0])[0]},${(Array.isArray(selected.color)?selected.color:PALETTE[0])[1]})`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}}>
                <div style={{width:72,height:72,borderRadius:'50%',background:'rgba(255,255,255,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontWeight:800,color:'#fff'}}>{getInitials(selected.couple)}</div>
              </div>
            )}
            <p style={{fontSize:18,fontWeight:700,color:'#1a1a2e',marginBottom:4}}>{selected.couple}</p>
            <p style={{fontSize:13,color:'#868e96'}}>{selected.category} · {selected.date}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
