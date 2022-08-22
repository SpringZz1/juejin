
携手创作，共同成长！这是我参与「掘金日新计划 · 8 月更文挑战」的第22天，[点击查看活动详情](https://juejin.cn/post/7123120819437322247 "https://juejin.cn/post/7123120819437322247")



## 一、前言

今天给大家分享一个自己写的ava实战的小案例，主要功能是实现指定一个文件夹，然后分组压缩里面的文件。其实这个案例还是有一定用途的，比如日志文件夹里面有几千个文件，如果我需要给每个压缩包指定10M，把整个文件夹里面的日志文件都进行压缩，这个案例就能够用得上了。废话少说，直接上代码。我这边采用的是最基本的控制台程序，主要还是代码的逻辑有一定的借鉴意义。欢迎大家互相交流学习，如有不妥之处，欢迎指正！

说明：暂时未考虑文件夹里面还有文件夹的情况。




## 二、代码示例

1.  ### 新建FileModel.java 实体

主要指定文件名以及文件大小，方便分组的时候使用。

```
public class FileModel {
    public FileModel(String name, double fileSize) {
        this.name = name;
        this.fileSize = fileSize;
    }


    // 文件名
    public String name;
    // 文件大小KB
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

2.  ### Main.java 代码：

文件夹中文件分组大小采用了递归的方式。为了实现效果代码都放在了Main.java里面。具体代码都有注释，直接看注释就行。

```
 private static final double FILE_SIZE=5500; // 指定分组压缩的大小 550KB
    private static final String PATH="D:\Test; // 指定要处理的文件夹
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




    // 递归方式实现文件分组
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
                        // 取差集
                        list = list.stream().filter(item -> !listAdd.contains(item)).collect(Collectors.toList());
                        map.put(listAdd.stream().mapToDouble(FileModel::getFileSize).sum(), listAdd);
                        getArr(list,fileSize,map);
                        break;


                    }
                }
            }
        }


    }


    //读取文件夹获取里面文件的名字尺寸 不考虑嵌套文件夹
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


    // 获取文件大小KB
    private static double getFileSizeKB(Long size) {
        double length = Double.parseDouble(String.valueOf(size));
        return  length / 1024.0;


    }


    // 返回文件大小尺寸
    private static String getFileSizeString(Long size) {
        double length = Double.parseDouble(String.valueOf(size));
        //如果字节数少于1024，则直接以B为单位，否则先除于1024，后3位因太少无意义
        if (length < 1024) {
            return length + "B";
        } else {
            length = length / 1024.0;
        }
        //如果原字节数除于1024之后，少于1024，则可以直接以KB作为单位
        //因为还没有到达要使用另一个单位的时候
        //接下去以此类推
        if (length < 1024) {
            return Math.round(length * 100) / 100.0 + "KB";
        } else {
            length = length / 1024.0;
        }
        if (length < 1024) {
            //因为如果以MB为单位的话，要保留最后1位小数，
            //因此，把此数乘以100之后再取余
            return Math.round(length * 100) / 100.0 + "MB";
        } else {
            //否则如果要以GB为单位的，先除于1024再作同样的处理
            return Math.round(length / 1024 * 100) / 100.0 + "GB";
        }
    }


    /**
     *  压缩指定文件夹中的所有文件，生成指定名称的zip压缩包
     *
     * @param list 需要压缩的文件名称列表(包含相对路径)
     * @param zipOutPath 压缩后的文件名称
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
                    //利用putNextEntry来把文件写入
                    zipOutputStream.putNextEntry(new ZipEntry(file1.getName()));
                    long read = Integer.MAX_VALUE;
                    int count = (int) Math.ceil((double) fileSize / read);
                    long pre = 0;
                    //由于一次映射的文件大小不能超过2GB，所以分次映射
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

## 三、展示效果

最终运行效果如下

![](https://img-blog.csdnimg.cn/img_convert/f75d72a65313f76a9ef1e1c85be1e843.png)

## 四、最后

本案例实现了指定分组大小压缩的功能，仅供参考学习交流，欢迎大神指正，提出更好的算法。高手勿喷！

代码地址：https://gitee.com/hgm1989/file-split-to-zip