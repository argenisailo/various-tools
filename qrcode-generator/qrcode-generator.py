import pandas
from pathlib import Path
import qrcode

df = pandas.read_excel('/Users/argenislo/Downloads/convert.xlsx', 'Sheet1')

for col in df.columns:
    print(df[col]['Nombre Completo'] + )

print(df['Nombre Completo'])

# if 'Programa' in df.columns:
#     df = df[[]]

# url = 'https://forms.monday.com/forms/b644aa5565e0084c1c9b5e26d3462d63?r=use1&text_mktkcz2c=Test'

# fn = Path("qrs/qr-1.png")
# img = qrcode.make(url)

# fn.parent.mkdir(parents=True, exist_ok=True)
# with open(fn, "wb") as f:
#     img.save(f, "PNG")
# print(f"QR code saved to {fn.resolve()}")