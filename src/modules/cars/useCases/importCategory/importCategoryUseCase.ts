import fs from 'fs';
import csvParser from 'csv-parser';

import { IRepositorie } from '../../repositories/ICategoriesRepository';

type ImportCategory = {
  name: string;
  description: string;
};

class ImportCategoryUseCase {
  constructor(private categoryRepository: IRepositorie) {}

  loadingCategories(file: Express.Multer.File): Promise<ImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: ImportCategory[] = [];

      const fileParsed = csvParser();

      stream.pipe(fileParsed);

      fileParsed
        .on('data', async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories: ImportCategory[] = await this.loadingCategories(file);

    categories.map(async (categorie) => {
      const { name, description } = categorie;

      const categoryExists = this.categoryRepository.categoryExists(name);

      if (!categoryExists) {
        this.categoryRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
