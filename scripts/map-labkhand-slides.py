import zipfile, re
from pathlib import Path
z=zipfile.ZipFile(r'F:/code/Raveshmand/tmp-labkhand.pptx')
for sp in sorted([n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml$', n)], key=lambda x:int(re.search(r'slide(\d+)',x).group(1))):
    num=int(re.search(r'slide(\d+)',sp).group(1))
    rels=f'ppt/slides/_rels/slide{num}.xml.rels'
    images=[]
    if rels in z.namelist():
        rx=z.read(rels).decode('utf-8')
        for m in re.finditer(r'Id="(rId\d+)"[^>]*Target="([^"]+)"', rx):
            if 'media/' in m.group(2):
                images.append(Path(m.group(2)).name)
    print(num, images)
