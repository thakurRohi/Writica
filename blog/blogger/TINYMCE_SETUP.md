# TinyMCE Setup Guide

## 🚀 Complete TinyMCE Configuration

### 1. Get Your API Key

1. **Sign up for TinyMCE Cloud**: Go to [https://www.tiny.cloud/auth/signup/](https://www.tiny.cloud/auth/signup/)
2. **Create a free account**: The free tier includes:
   - 1 domain
   - Basic features
   - 100MB storage
   - Enhanced Tables, Enhanced Media Embed, Import from Word
3. **Get your API key**: Once logged in, go to your dashboard and copy your API key

### 2. Configure Environment Variables

Create a `.env` file in your project root (if it doesn't exist) and add:

```env
# Appwrite Configuration (your existing config)
VITE_APPWRITE_URL=your_appwrite_url_here
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here
VITE_APPWRITE_COLLECTION_ID=your_collection_id_here
VITE_APPWRITE_BUCKET_ID=your_bucket_id_here

# TinyMCE Configuration (NEW)
VITE_TINYMCE_API_KEY=your_actual_tinymce_api_key_here
```

### 3. Configure Your Domain

1. **For Development**: Add `localhost` to your TinyMCE domain list
2. **For Production**: Add your actual domain (e.g., `yourdomain.com`)
3. **For Testing**: You can also add `127.0.0.1`

### 4. Enhanced Features Now Available

The updated RTE component now includes:

#### ✅ Enhanced Tables
- Advanced table toolbar
- Table styling options
- Row/column management

#### ✅ Enhanced Media Embed
- Live media previews
- Better media handling
- Responsive media embeds

#### ✅ Import from Word
- Paste content from Microsoft Word
- Maintains formatting
- Clean HTML output

#### ✅ Additional Features
- **Auto-save**: Content saves every 30 seconds
- **Spell checker**: Browser-based spell checking
- **Code samples**: Syntax highlighting for multiple languages
- **Quick toolbar**: Context-aware formatting options
- **Enhanced images**: Advanced image options and captions
- **Emoticons**: Built-in emoji support
- **Page breaks**: Better document structure

### 5. Testing Your Setup

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to your blog post creation page**

3. **Test the enhanced features**:
   - Try creating a table
   - Insert media (images, videos)
   - Paste content from Word
   - Use the code sample feature
   - Test auto-save functionality

### 6. Troubleshooting

#### If you see "API key required" warnings:
- Make sure your `.env` file is in the project root
- Restart your development server after adding the API key
- Check that the API key is correct

#### If features aren't working:
- Verify your domain is added to TinyMCE dashboard
- Check browser console for errors
- Ensure you're using the latest version of `@tinymce/tinymce-react`

#### For production deployment:
- Add your production domain to TinyMCE dashboard
- Update your environment variables for production
- Test all features in production environment

### 7. Advanced Configuration

You can further customize TinyMCE by modifying the `init` object in `src/Components/RTE.jsx`:

- **Custom themes**: Add your own CSS styling
- **Custom plugins**: Install and configure additional plugins
- **Custom toolbar**: Reorganize toolbar buttons
- **Custom content styles**: Define your own content styling

### 8. Security Best Practices

- ✅ Never commit your API key to version control
- ✅ Use environment variables for all sensitive data
- ✅ Regularly rotate your API keys
- ✅ Monitor your TinyMCE usage in the dashboard

---

## 🎉 You're All Set!

Your TinyMCE editor is now fully configured with:
- ✅ API key integration
- ✅ Enhanced features enabled
- ✅ Domain configuration ready
- ✅ Production-ready setup

Happy blogging! 🚀 