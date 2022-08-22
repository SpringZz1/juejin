
Я�ִ�������ͬ�ɳ��������Ҳ��롸������¼ƻ� �� 8 �¸�����ս���ĵ�22�죬[����鿴�����](https://juejin.cn/post/7123120819437322247 "https://juejin.cn/post/7123120819437322247")



## һ��ǰ��

�������ҷ���һ���Լ�д��avaʵս��С��������Ҫ������ʵ��ָ��һ���ļ��У�Ȼ�����ѹ��������ļ�����ʵ�������������һ����;�ģ�������־�ļ��������м�ǧ���ļ����������Ҫ��ÿ��ѹ����ָ��10M���������ļ����������־�ļ�������ѹ��������������ܹ��õ����ˡ��ϻ���˵��ֱ���ϴ��롣����߲��õ���������Ŀ���̨������Ҫ���Ǵ�����߼���һ���Ľ�����塣��ӭ��һ��ཻ��ѧϰ�����в���֮������ӭָ����

˵������ʱδ�����ļ������滹���ļ��е������




## ��������ʾ��

1.  ### �½�FileModel.java ʵ��

��Ҫָ���ļ����Լ��ļ���С����������ʱ��ʹ�á�

```
public class FileModel {
    public FileModel(String name, double fileSize) {
        this.name = name;
        this.fileSize = fileSize;
    }


    // �ļ���
    public String name;
    // �ļ���СKB
    public double fileSize;


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public double getFileSize() {
        return fileSize;
    }


    public void setFileSize(double fileSize) {
        this.fileSize = fileSize;
    }
}
```

2.  ### Main.java ���룺

�ļ������ļ������С�����˵ݹ�ķ�ʽ��Ϊ��ʵ��Ч�����붼������Main.java���档������붼��ע�ͣ�ֱ�ӿ�ע�;��С�

```
 private static final double FILE_SIZE=5500; // ָ������ѹ���Ĵ�С 550KB
    private static final String PATH="D:\Test; // ָ��Ҫ������ļ���
    public static void main(String[] args) {
        List<FileModel> list = getFiles(PATH);
        HashMap<Double, List<FileModel>> map = new HashMap<>();
        getArr(list,FILE_SIZE,map);
        if(map.size()>0)
        {
            for (Double aDouble : map.keySet()) {
                List<FileModel> fileModels = map.get(aDouble);
                batchZipFiles(fileModels,PATH+"\"+aDouble.toString()+".zip");
            }
        }
        System.out.println(map);
    }




    // �ݹ鷽ʽʵ���ļ�����
    private static void getArr(List<FileModel> list, double fileSize,Map<Double, List<FileModel>> map) {
        List<FileModel> listAdd = new ArrayList<>();
        if (list.size() > 0) {
            for (FileModel fileModel : list) {
                if (listAdd.size() == 0) {
                    listAdd.add(fileModel);
                } else {


                    if (listAdd.stream().mapToDouble(FileModel::getFileSize).sum() < fileSize) {
                        listAdd.add(fileModel);
                        if(listAdd.size()==list.size())
                        {
                            map.put(listAdd.stream().mapToDouble(FileModel::getFileSize).sum(), listAdd);
                        }
                    } else {
                        // ȡ�
                        list = list.stream().filter(item -> !listAdd.contains(item)).collect(Collectors.toList());
                        map.put(listAdd.stream().mapToDouble(FileModel::getFileSize).sum(), listAdd);
                        getArr(list,fileSize,map);
                        break;


                    }
                }
            }
        }


    }


    //��ȡ�ļ��л�ȡ�����ļ������ֳߴ� ������Ƕ���ļ���
    private static List<FileModel> getFiles(String path) {
        List<FileModel> files = new ArrayList<FileModel>();
        File file = new File(path);
        File[] tempList = file.listFiles();
        if (tempList != null && tempList.length > 0) {
            for (File value : tempList) {
                if (value.isFile()) {
                    // System.out.println(value.getName() + ":" + getFileSizeString(value.length()));
                    files.add(new FileModel(
                            value.getName(), getFileSizeKB(value.length())
                    ));
                }
            }
        }
        return files;
    }


    // ��ȡ�ļ���СKB
    private static double getFileSizeKB(Long size) {
        double length = Double.parseDouble(String.valueOf(size));
        return  length / 1024.0;


    }


    // �����ļ���С�ߴ�
    private static String getFileSizeString(Long size) {
        double length = Double.parseDouble(String.valueOf(size));
        //����ֽ�������1024����ֱ����BΪ��λ�������ȳ���1024����3λ��̫��������
        if (length < 1024) {
            return length + "B";
        } else {
            length = length / 1024.0;
        }
        //���ԭ�ֽ�������1024֮������1024�������ֱ����KB��Ϊ��λ
        //��Ϊ��û�е���Ҫʹ����һ����λ��ʱ��
        //����ȥ�Դ�����
        if (length < 1024) {
            return Math.round(length * 100) / 100.0 + "KB";
        } else {
            length = length / 1024.0;
        }
        if (length < 1024) {
            //��Ϊ�����MBΪ��λ�Ļ���Ҫ�������1λС����
            //��ˣ��Ѵ�������100֮����ȡ��
            return Math.round(length * 100) / 100.0 + "MB";
        } else {
            //�������Ҫ��GBΪ��λ�ģ��ȳ���1024����ͬ���Ĵ���
            return Math.round(length / 1024 * 100) / 100.0 + "GB";
        }
    }


    /**
     *  ѹ��ָ���ļ����е������ļ�������ָ�����Ƶ�zipѹ����
     *
     * @param list ��Ҫѹ�����ļ������б�(�������·��)
     * @param zipOutPath ѹ������ļ�����
     **/
    public static void batchZipFiles(List<FileModel> list, String zipOutPath) {
        ZipOutputStream zipOutputStream = null;
        WritableByteChannel writableByteChannel = null;
        MappedByteBuffer mappedByteBuffer = null;
        try {
            zipOutputStream = new ZipOutputStream(new FileOutputStream(zipOutPath));
            writableByteChannel = Channels.newChannel(zipOutputStream);


            File file = new File(PATH);
            File[] tempList = file.listFiles();
            List<String> fileList = list.stream().map(FileModel::getName).collect(Collectors.toList());
            File[] addList=new File[fileList.size()];
            assert tempList != null;
            for (File file1 : tempList) {
                if(fileList.contains(file1.getName()))
                {
                    long fileSize = file1.length();
                    //����putNextEntry�����ļ�д��
                    zipOutputStream.putNextEntry(new ZipEntry(file1.getName()));
                    long read = Integer.MAX_VALUE;
                    int count = (int) Math.ceil((double) fileSize / read);
                    long pre = 0;
                    //����һ��ӳ����ļ���С���ܳ���2GB�����Էִ�ӳ��
                    for (int i = 0; i < count; i++) {
                        if (fileSize - pre < Integer.MAX_VALUE) {
                            read = fileSize - pre;
                        }
                        mappedByteBuffer = new RandomAccessFile(file1, "r").getChannel()
                                .map(FileChannel.MapMode.READ_ONLY, pre, read);
                        writableByteChannel.write(mappedByteBuffer);
                        pre += read;
                    }
                }
            }
            assert mappedByteBuffer != null;
            mappedByteBuffer.clear();
        } catch (Exception e) {


        } finally {
            try {
                if (null != zipOutputStream) {
                    zipOutputStream.close();
                }
                if (null != writableByteChannel) {
                    writableByteChannel.close();
                }
                if (null != mappedByteBuffer) {
                    mappedByteBuffer.clear();
                }
            } catch (Exception e) {


            }
        }
    }
```

## ����չʾЧ��

��������Ч������

![](https://img-blog.csdnimg.cn/img_convert/f75d72a65313f76a9ef1e1c85be1e843.png)

## �ġ����

������ʵ����ָ�������Сѹ���Ĺ��ܣ������ο�ѧϰ��������ӭ����ָ����������õ��㷨���������磡

�����ַ��https://gitee.com/hgm1989/file-split-to-zip