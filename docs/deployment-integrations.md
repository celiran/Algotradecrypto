# חיבורים בזמן העלאה

האתר מוכן לחיבורים הבאים, אך הם כבויים עד שמוגדרים הערכים המתאימים. אין לשמור מפתחות אמת ב־Git.

## Google Analytics 4

הגדירו את מזהה המדידה של GA4 כמשתנה build בשם `NEXT_PUBLIC_GA_MEASUREMENT_ID` (לדוגמה `G-XXXXXXXXXX`) והפעילו build חדש. ללא הערך הזה, קוד Analytics כלל לא נטען באתר.

לפני הפעלה יש לעדכן את מדיניות הפרטיות ואת מנגנון ההסכמה לעוגיות, אם נדרש לפי אופן השימוש והדין החל.

## Cloudflare Turnstile

1. צרו widget ל־`algotradecrypto.com` ב־Cloudflare Turnstile.
2. הגדירו `TURNSTILE_SITE_KEY` כ־Worker variable.
3. הגדירו `TURNSTILE_SECRET_KEY` רק כ־Worker secret.

הטופס מפעיל את האימות רק כששני הערכים מוגדרים. הערך הסודי נבדק בשרת מול Cloudflare ואינו נשלח לדפדפן.

## מיילים מטופס צור קשר

פתחו בהמשך כתובת שולח ייעודית בדומיין, למשל `contact@algotradecrypto.com`, והגדירו Cloudflare Email binding בשם `EMAIL`. לאחר מכן הגדירו:

- `CONTACT_FROM_EMAIL` — כתובת השולח המאומתת.
- `CONTACT_DESTINATION_EMAIL` — תיבת המייל שאליה מתקבלות הפניות.

התשובה למבקר נשמרת כ־`Reply-To`, כך שאפשר להשיב ישירות לפנייה. דוגמת הגדרה מלאה נמצאת ב־[cloudflare-contact-setup.md](./cloudflare-contact-setup.md).
